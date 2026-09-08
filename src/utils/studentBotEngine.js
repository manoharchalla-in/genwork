import studentData from '../data/students.json';

let lastSelectedStudent = null;
let lastResultSet = [];

export function queryStudentBot(prompt) {
  const rawPrompt = prompt.trim();
  const cleanPrompt = rawPrompt.toLowerCase();
  const students = Object.values(studentData);

  // 1. CONTEXTUAL ORDINAL & FOLLOW-UP SELECTION HANDLING
  if (lastSelectedStudent && (cleanPrompt.includes('mark') || cleanPrompt.includes('grade') || cleanPrompt.includes('subject') || cleanPrompt.includes('result') || cleanPrompt.includes('info') || cleanPrompt.includes('basic') || cleanPrompt.includes('father') || cleanPrompt.includes('mother') || cleanPrompt.includes('dob') || cleanPrompt.includes('aadhar') || cleanPrompt.includes('sem'))) {
    return formatStudentCard(lastSelectedStudent, true);
  }

  if (lastResultSet.length > 0) {
    const ordinalIndex = parseOrdinalIndex(cleanPrompt, lastResultSet.length);
    if (ordinalIndex !== null && lastResultSet[ordinalIndex]) {
      const selected = lastResultSet[ordinalIndex];
      lastSelectedStudent = selected;
      return formatStudentCard(selected, true);
    }
  }

  if (lastSelectedStudent && isFollowUpQuery(cleanPrompt)) {
    return handleFollowUpQuery(cleanPrompt, lastSelectedStudent);
  }

  // 2. PARSE STRUCTURED SEARCH INTENT
  const intent = parseSearchIntent(cleanPrompt, rawPrompt);

  return executeSearchIntent(intent, students, cleanPrompt);
}

function parseOrdinalIndex(cleanPrompt, listLength) {
  if (/^first(\s+one)?$/i.test(cleanPrompt) || /^1st(\s+one)?$/i.test(cleanPrompt) || cleanPrompt.includes('first student') || cleanPrompt.includes('1st student')) {
    return 0;
  }
  if (/^second(\s+one)?$/i.test(cleanPrompt) || /^2nd(\s+one)?$/i.test(cleanPrompt) || cleanPrompt.includes('second student') || cleanPrompt.includes('2nd student')) {
    return 1;
  }
  if (/^third(\s+one)?$/i.test(cleanPrompt) || /^3rd(\s+one)?$/i.test(cleanPrompt) || cleanPrompt.includes('third student') || cleanPrompt.includes('3rd student')) {
    return 2;
  }
  if (/^last(\s+one)?$/i.test(cleanPrompt) || cleanPrompt.includes('last student')) {
    return listLength - 1;
  }

  const numMatch = cleanPrompt.match(/(?:number|option|#)\s*(\d+)/i) || cleanPrompt.match(/^(\d+)$/);
  if (numMatch) {
    const idx = parseInt(numMatch[1], 10) - 1;
    if (idx >= 0 && idx < listLength) {
      return idx;
    }
  }

  return null;
}

function parseSearchIntent(cleanPrompt, rawPrompt) {
  const intent = {
    search_type: 'SEARCH',
    target_entity: 'student',
    operator: 'EXACT',
    field: 'ANY',
    search_value: '',
    limit: null,
    requested_fields: null
  };

  if (cleanPrompt.includes('how many') || cleanPrompt.startsWith('count')) {
    intent.search_type = 'COUNT';
  }

  const limitMatch = cleanPrompt.match(/(?:first|top|limit)\s+(\d+)/);
  if (limitMatch) {
    intent.limit = parseInt(limitMatch[1], 10);
  }

  if (cleanPrompt.includes('email')) intent.requested_fields = ['email'];
  if (cleanPrompt.includes('phone') || cleanPrompt.includes('mobile')) intent.requested_fields = ['phone'];
  if (cleanPrompt.includes('category') || cleanPrompt.includes('caste')) intent.requested_fields = ['category'];

  const startsWithMatch = cleanPrompt.match(/(?:starting with|starts with|begin with|begins with)\s+['"]?([a-z0-9]+)['"]?/i);
  if (startsWithMatch) {
    intent.operator = 'STARTS_WITH';
    intent.search_value = startsWithMatch[1].trim();
    return intent;
  }

  const endsWithMatch = cleanPrompt.match(/(?:ending with|ends with|ends in)\s+['"]?([a-z0-9]+)['"]?/i);
  if (endsWithMatch) {
    intent.operator = 'ENDS_WITH';
    intent.search_value = endsWithMatch[1].trim();
    return intent;
  }

  const containsMatch = cleanPrompt.match(/(?:containing|contains|includes|anywhere in)\s+['"]?([a-z0-9]+)['"]?/i);
  if (containsMatch) {
    intent.operator = 'CONTAINS';
    intent.search_value = containsMatch[1].trim();
    return intent;
  }

  const rollMatch = cleanPrompt.match(/[2345]\dht1a\w+/i);
  if (rollMatch) {
    intent.field = 'ID';
    intent.operator = 'EXACT';
    intent.search_value = rollMatch[0].toUpperCase();
    return intent;
  }

  let extractedValue = cleanPrompt
    .replace(/(?:find|search|look for|show|get|give me|i need information about|find the user named|search for|can you get|details|complete information|full record|record for|all users|show all|list|who is|people|customers|users|in the database|marks|subject|marks details|marks are shouldsee)/g, '')
    .trim();

  if (extractedValue) {
    intent.search_value = extractedValue;
  }

  return intent;
}

function executeSearchIntent(intent, students, fullPrompt) {
  let matches = [];

  if (intent.operator === 'STARTS_WITH') {
    const val = intent.search_value.toLowerCase();
    matches = students.filter(s => 
      s.id.toLowerCase().startsWith(val) || 
      s.name.toLowerCase().startsWith(val) ||
      s.name.split(' ').some(part => part.toLowerCase().startsWith(val))
    );
  } else if (intent.operator === 'ENDS_WITH') {
    const val = intent.search_value.toLowerCase();
    matches = students.filter(s => 
      s.id.toLowerCase().endsWith(val) || 
      s.name.toLowerCase().endsWith(val)
    );
  } else if (intent.operator === 'CONTAINS') {
    const val = intent.search_value.toLowerCase();
    matches = students.filter(s => 
      s.id.toLowerCase().includes(val) || 
      s.name.toLowerCase().includes(val)
    );
  } else if (intent.field === 'ID') {
    const val = intent.search_value.toUpperCase();
    matches = students.filter(s => s.id === val);
  } else {
    const val = intent.search_value.toLowerCase();

    if (!val || val === 'all' || val === 'student') {
      matches = students;
    } else {
      const exactIdMatch = students.filter(s => s.id.toLowerCase() === val);
      if (exactIdMatch.length > 0) {
        matches = exactIdMatch;
      } else {
        const exactNameMatch = students.filter(s => s.name.toLowerCase() === val);
        if (exactNameMatch.length > 0) {
          matches = exactNameMatch;
        } else {
          const queryWords = val.split(' ').filter(w => w.length > 1);
          matches = students.filter(s => 
            s.id.toLowerCase().includes(val) ||
            s.email.toLowerCase().includes(val) ||
            (s.phone && s.phone.includes(val)) ||
            queryWords.every(w => s.name.toLowerCase().includes(w))
          );
        }
      }
    }
  }

  if (intent.search_type === 'COUNT') {
    return `📊 Count Result: Found ${matches.length} matching student(s) for your search query.`;
  }

  if (intent.limit && intent.limit > 0) {
    matches = matches.slice(0, intent.limit);
  }

  lastResultSet = matches;
  if (matches.length === 1) {
    lastSelectedStudent = matches[0];
  } else {
    lastSelectedStudent = null;
  }

  if (matches.length === 0) {
    return `❌ No matching student records found in the database. Please verify the name or ID and try again.`;
  }

  if (matches.length === 1) {
    return formatStudentCard(matches[0], true);
  }

  let responseText = `🔍 Found ${matches.length} matching student record(s):\n\n`;
  responseText += `| ID | Student Name | CGPA | Phone | Email |\n`;
  responseText += `| :--- | :--- | :--- | :--- | :--- |\n`;
  
  const displayList = matches.slice(0, 15);
  displayList.forEach(s => {
    responseText += `| ${s.id} | ${s.name} | ${s.cgpa} | ${s.phone} | ${s.email} |\n`;
  });

  if (matches.length > 15) {
    responseText += `\n*... and ${matches.length - 15} more records.*`;
  }

  responseText += `\n\n💡 Tip: Reply with "first one", "second one", "1st", "2nd", or a specific Roll Number (e.g. "${matches[0].id}") to view full detailed record.`;
  return responseText;
}

function formatStudentCard(s, includeMarks = true) {
  let statusBadge = s.failedCount > 0 
    ? `🔴 ${s.failedCount} Backlog(s)` 
    : `🟢 All Passed`;

  let card = `### 👤 ${s.name}\n\n`;
  card += `#### 📋 Basic Student Information\n`;
  card += `| Field | Details |\n`;
  card += `| :--- | :--- |\n`;
  card += `| Hall Ticket No | ${s.id} |\n`;
  card += `| Branch | ${s.branch || s.category || 'N/A'} |\n`;
  if (s.currentSemester) card += `| Current Semester | ${s.currentSemester} |\n`;
  if (s.adminDate) card += `| Admission Date | ${s.adminDate} |\n`;
  if (s.batch) card += `| Batch | ${s.batch} |\n`;
  if (s.dob) card += `| Date of Birth | ${s.dob} |\n`;
  card += `| Caste Category | ${s.category} |\n`;
  if (s.fatherName) card += `| Father Name | ${s.fatherName} |\n`;
  if (s.motherName) card += `| Mother Name | ${s.motherName} |\n`;
  card += `| Student Email | ${s.email} |\n`;
  card += `| Parent Mobile No | ${s.phone} |\n`;
  if (s.aadhar) card += `| Aadhar No | ${s.aadhar} |\n`;

  card += `\n#### 📊 Overall Academic Performance Summary\n`;
  card += `| Metric | Details |\n`;
  card += `| :--- | :--- |\n`;
  card += `| Cumulative GPA (CGPA) | **${s.cgpa}** |\n`;
  card += `| Latest Semester GPA (SGPA) | **${s.sgpa}** |\n`;
  if (s.creditsObtained) card += `| Credits Obtained | ${s.creditsObtained} |\n`;
  if (s.subjectDue) card += `| Subject Due (Backlogs) | ${s.subjectDue} |\n`;
  card += `| Academic Status | ${statusBadge} |\n`;

  // Render Semester-by-Semester Tables if structured semesters exist
  if (s.semesters && Object.keys(s.semesters).length > 0) {
    card += `\n\n📚 **Complete Semester-wise Marks & Performance Breakdown:**\n`;
    Object.entries(s.semesters).forEach(([semTitle, semData]) => {
      card += `\n##### 🎓 ${semTitle} (${semData.examDate})\n`;
      card += `• **Semester SGPA:** ${semData.sgpa} | **CGPA:** ${semData.cgpa} | **Credits:** ${semData.credits} | **Passed:** ${semData.subjectsPassed} | **Due:** ${semData.subjectsDue}\n\n`;
      card += `| Code | Subject Name | Grade | Credits | Status |\n`;
      card += `| :--- | :--- | :--- | :--- | :--- |\n`;
      semData.subjects.forEach(sub => {
        card += `| ${sub.code} | ${sub.subject} | **${sub.grade}** | ${sub.credits} | ${sub.status === 'Pass' || sub.status === 'P' ? 'Pass' : '🔴 Fail'} |\n`;
      });
    });
  } else if (includeMarks && s.subjects && s.subjects.length > 0) {
    card += `\n\n📚 **Subject-wise Marks Details:**\n\n`;
    card += `| Code | Subject Name | Grade | Credits | Status |\n`;
    card += `| :--- | :--- | :--- | :--- | :--- |\n`;
    s.subjects.forEach(sub => {
      card += `| ${sub.code} | ${sub.subject} | **${sub.grade}** | ${sub.credits} | ${sub.status === 'Pass' || sub.status === 'P' ? 'Pass' : '🔴 Fail'} |\n`;
    });
  }

  if (s.failedCount > 0 && s.failedSubjects && s.failedSubjects.length > 0) {
    card += `\n\n❌ **Active Failed Subjects Summary:**\n`;
    s.failedSubjects.forEach(f => {
      card += `• \`${f.code}\` — **${f.subject}** (${f.sem || ''}) — Grade: \`${f.grade}\`\n`;
    });
  }

  return card;
}

function isFollowUpQuery(cleanPrompt) {
  const followUpWords = ['his', 'her', 'their', 'this student', 'the email', 'the phone', 'what is email', 'what is phone', 'show email', 'show phone', 'his city', 'her cgpa', 'mark', 'grade', 'subject', 'info', 'father', 'mother', 'dob', 'sem'];
  return followUpWords.some(w => cleanPrompt.includes(w));
}

function handleFollowUpQuery(cleanPrompt, student) {
  return formatStudentCard(student, true);
}
