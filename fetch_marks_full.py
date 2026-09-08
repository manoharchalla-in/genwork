import requests
from bs4 import BeautifulSoup
import json

session = requests.Session()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}
login_url = 'http://exams.city.ac.in:8081/Login.aspx'

# Step 1: GET Login
r1 = session.get(login_url, headers=headers)
soup1 = BeautifulSoup(r1.text, 'html.parser')

# Step 2: Student Postback
r2 = session.post(login_url, data={
    '__EVENTTARGET': 'lnkStudent',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': soup1.find('input', {'id': '__VIEWSTATE'})['value'],
    '__EVENTVALIDATION': soup1.find('input', {'id': '__EVENTVALIDATION'})['value'],
    '__VIEWSTATEGENERATOR': soup1.find('input', {'id': '__VIEWSTATEGENERATOR'})['value']
}, headers=headers)
soup2 = BeautifulSoup(r2.text, 'html.parser')

# Step 3: Login 23HT1A4301
r3 = session.post(login_url, data={
    '__EVENTTARGET': '',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': soup2.find('input', {'id': '__VIEWSTATE'})['value'],
    '__EVENTVALIDATION': soup2.find('input', {'id': '__EVENTVALIDATION'})['value'],
    '__VIEWSTATEGENERATOR': soup2.find('input', {'id': '__VIEWSTATEGENERATOR'})['value'],
    'txtUserId': '23HT1A4301',
    'txtPwd': '23HT1A4301',
    'btnLogin': 'Login'
}, headers=headers)

main_url = r3.url
soup3 = BeautifulSoup(r3.text, 'html.parser')

# Step 4: Click Overall Marks
r_marks = session.post(main_url, data={
    '__EVENTTARGET': 'ctl00$lnkOverallMarks',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': soup3.find('input', {'id': '__VIEWSTATE'})['value'],
    '__EVENTVALIDATION': soup3.find('input', {'id': '__EVENTVALIDATION'})['value'],
    '__VIEWSTATEGENERATOR': soup3.find('input', {'id': '__VIEWSTATEGENERATOR'})['value']
}, headers=headers)

with open(r'd:\CHAT\overall_marks_full.html', 'w', encoding='utf-8') as f:
    f.write(r_marks.text)

print('Saved overall_marks_full.html successfully!')
