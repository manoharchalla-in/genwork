import requests
from bs4 import BeautifulSoup

session = requests.Session()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

base_url = 'http://exams.city.ac.in:8081/Login.aspx'

# Step 1: Initial GET
r1 = session.get(base_url, headers=headers)
soup1 = BeautifulSoup(r1.text, 'html.parser')

viewstate = soup1.find('input', {'id': '__VIEWSTATE'})['value']
eventval = soup1.find('input', {'id': '__EVENTVALIDATION'})['value']
viewgen = soup1.find('input', {'id': '__VIEWSTATEGENERATOR'})['value']

# Step 2: Postback to load student form
r2 = session.post(base_url, data={
    '__EVENTTARGET': 'lnkStudent',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': viewstate,
    '__EVENTVALIDATION': eventval,
    '__VIEWSTATEGENERATOR': viewgen
}, headers=headers)
soup2 = BeautifulSoup(r2.text, 'html.parser')

# Step 3: Postback Login with 23HT1A4301 / 23HT1A4301
r3 = session.post(base_url, data={
    '__EVENTTARGET': '',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': soup2.find('input', {'id': '__VIEWSTATE'})['value'],
    '__EVENTVALIDATION': soup2.find('input', {'id': '__EVENTVALIDATION'})['value'],
    '__VIEWSTATEGENERATOR': soup2.find('input', {'id': '__VIEWSTATEGENERATOR'})['value'],
    'txtUserId': '23HT1A4301',
    'txtPwd': '23HT1A4301',
    'btnLogin': 'Login'
}, headers=headers)

soup3 = BeautifulSoup(r3.text, 'html.parser')
main_url = r3.url
print('Main Portal URL:', main_url)

# Step 4: Click Overall Marks link via doPostBack ('ctl00$lnkOverallMarks', '')
payload_marks = {
    '__EVENTTARGET': 'ctl00$lnkOverallMarks',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': soup3.find('input', {'id': '__VIEWSTATE'})['value'],
    '__EVENTVALIDATION': soup3.find('input', {'id': '__EVENTVALIDATION'})['value'],
    '__VIEWSTATEGENERATOR': soup3.find('input', {'id': '__VIEWSTATEGENERATOR'})['value']
}

r_marks_post = session.post(main_url, data=payload_marks, headers=headers)
print('Overall Marks Postback Status:', r_marks_post.status_code)

with open(r'd:\CHAT\fetched_overall_marks_23HT1A4301.html', 'w', encoding='utf-8') as f:
    f.write(r_marks_post.text)

# Step 5: Click Basic Info link via doPostBack ('ctl00$lnkStuInfo', '')
payload_info = {
    '__EVENTTARGET': 'ctl00$lnkStuInfo',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': soup3.find('input', {'id': '__VIEWSTATE'})['value'],
    '__EVENTVALIDATION': soup3.find('input', {'id': '__EVENTVALIDATION'})['value'],
    '__VIEWSTATEGENERATOR': soup3.find('input', {'id': '__VIEWSTATEGENERATOR'})['value']
}

r_info_post = session.post(main_url, data=payload_info, headers=headers)
print('Basic Info Postback Status:', r_info_post.status_code)

with open(r'd:\CHAT\fetched_basic_info_23HT1A4301.html', 'w', encoding='utf-8') as f:
    f.write(r_info_post.text)

print('Successfully fetched portal data for 23HT1A4301!')
