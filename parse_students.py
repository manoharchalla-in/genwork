import os
import glob
import re
import json

dirs_to_scan = [
    r'C:\Users\23ht1\Downloads\deploy-68a8524fb48f767364228d33\students',
    r'C:\Users\23ht1\Downloads\deploy-68a8522139cf9e653d519e70\students'
]

data = {}

for students_dir in dirs_to_scan:
    if not os.path.exists(students_dir):
        continue
    
    folders = [f for f in os.listdir(students_dir) if os.path.isdir(os.path.join(students_dir, f))]

    for f in folders:
        student_id = f.upper()
        f_path = os.path.join(students_dir, f)
        
        student_record = data.get(student_id, {
            'id': student_id,
            'name': 'Unknown',
            'email': 'N/A',
            'phone': 'N/A',
            'category': 'N/A',
            'location': 'N/A',
            'cgpa': 'N/A',
            'sgpa': 'N/A',
            'failedCount': 0,
            'failedSubjects': []
        })

        html_files = glob.glob(os.path.join(f_path, '*.html'))
        for hf in html_files:
            if 'result' not in os.path.basename(hf).lower() and 'internship' not in os.path.basename(hf).lower():
                with open(hf, 'r', encoding='utf-8', errors='ignore') as file:
                    content = file.read()
                    
                    # Name
                    name_m = re.search(r'class=["\']name["\'][^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
                    if name_m:
                        clean_name = re.sub(r'<[^>]+>', '', name_m.group(1)).strip()
                        if clean_name:
                            student_record['name'] = clean_name
                    
                    # Email
                    email_m = re.search(r'href="mailto:(.*?)"', content, re.IGNORECASE)
                    if email_m:
                        student_record['email'] = email_m.group(1).strip()
                    
                    # Phone - robust clean extraction
                    phone_m = re.search(r'class="contact-title">Phone</p>\s*<a[^>]*>(.*?)</a>', content, re.IGNORECASE | re.DOTALL)
                    if phone_m:
                        raw_phone = phone_m.group(1)
                        clean_phone = re.sub(r'<[^>]+>', '', raw_phone).strip()
                        clean_phone = re.sub(r'[^0-9+]', '', clean_phone)
                        if clean_phone:
                            student_record['phone'] = clean_phone

                    # Category
                    cat_m = re.search(r'Category\s*</h4>\s*<p[^>]*>(.*?)</p>', content, re.IGNORECASE | re.DOTALL)
                    if cat_m:
                        clean_cat = re.sub(r'<[^>]+>', '', cat_m.group(1)).strip()
                        clean_cat = re.sub(r'\s+', ' ', clean_cat)
                        if clean_cat:
                            student_record['category'] = clean_cat

        # Parse result.html
        result_file = os.path.join(f_path, 'result.html')
        if not os.path.exists(result_file):
            for hf in html_files:
                if 'result' not in os.path.basename(hf).lower():
                    result_file = hf
                    break

        if os.path.exists(result_file):
            with open(result_file, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                cgpa_m = re.findall(r'CGPA</td><td[^>]*>(.*?)</td>', content, re.IGNORECASE)
                if cgpa_m:
                    student_record['cgpa'] = cgpa_m[-1].strip()
                sgpa_m = re.findall(r'SGPA</td><td[^>]*>(.*?)</td>', content, re.IGNORECASE)
                if sgpa_m:
                    student_record['sgpa'] = sgpa_m[-1].strip()
                
                rows = re.findall(r'<tr><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td></tr>', content, re.IGNORECASE)
                failed_subjects = []
                for r in rows:
                    code = r[0].strip()
                    subject = r[1].strip()
                    grade = r[2].strip()
                    credits = r[3].strip()
                    status = re.sub(r'<[^>]+>', '', r[4]).strip()

                    if 'fail' in status.lower() or grade.upper() == 'F':
                        failed_subjects.append({
                            'code': code,
                            'subject': subject,
                            'grade': grade,
                            'credits': credits,
                            'status': status
                        })
                if failed_subjects:
                    student_record['failedCount'] = len(failed_subjects)
                    student_record['failedSubjects'] = failed_subjects

        data[student_id] = student_record

output_path = r'd:\CHAT\src\data\students.json'
with open(output_path, 'w', encoding='utf-8') as out:
    json.dump(data, out, indent=2)

print('Cleaned and saved', len(data), 'student records!')
