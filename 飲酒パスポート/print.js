function collectData() {
  return {
    studentId: document.getElementById('studentId').value,
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value,
    department: document.getElementById('department').value,
    photoSrc: document.getElementById('photoPreview').src,
  };
}

function printPassport() {
  const data = collectData();
  const cardHTML = () => `
    <div class="passport">
      <div class="passport-body">
        <div class="left">
          <div class="header">飲酒パスポート</div>
          <div class="section">
            <h4>基本情報</h4>
            <p>学籍番号: ${data.studentId}</p>
            <p>氏名: ${data.name}</p>
            <p>年齢: ${data.age}</p>
            <p>性別: ${data.gender}</p>
            <p>所属: ${data.department}</p>
          </div>
        </div>
        <div class="right">
          <img src="${data.photoSrc}" alt="顔写真">
          <div class="stamp-area">（学園祭本部印）</div>
          <div class="section check-area">
            <h4>飲酒チェック</h4>
            <div class="checkboxes">
              <div class="checkbox-item"><div class="checkbox-square"></div><span>飲酒量1</span></div>
              <div class="checkbox-item"><div class="checkbox-square"></div><span>飲酒量2</span></div>
              <div class="checkbox-item"><div class="checkbox-square"></div><span>飲酒量3</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  const printContent = `
    <html>
    <head>
      <title>飲酒パスポート印刷</title>
      <style>
        @media print {
          @page { size: A4 landscape; margin: 0; }
          html, body {
            margin: 0;
            padding: 0;
            width: 297mm;
            height: 210mm;
          }
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Arial', sans-serif;
          }
          .passport {
            width: 270mm;
            height: 180mm;
            padding: 10mm;
            border: 2px solid #000;
            border-radius: 8px;
            box-sizing: border-box;
            page-break-inside: avoid;
          }
          .passport-body {
            display: flex;
            height: 100%;
            justify-content: space-between;
          }
          .left, .right {
            width: 48%;
          }
          .header {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
          }
          .section {
            font-size: 14px;
            margin-top: 10px;
          }
          img {
            width: 100px;
            height: auto;
            border: 1px solid #000;
            border-radius: 4px;
            display: block;
            margin: 10px auto 5px;
          }
          .stamp-area {
            text-align: center;
            margin-top: 5px;
            font-size: 12px;
            height: 20px;
            border-top: 1px dotted #000;
          }
          .check-area {
            margin-top: 20px;
          }
          .checkboxes {
            display: flex;
            flex-direction: column;
            gap: 5mm;
            align-items: flex-start;
          }
          .checkbox-item {
            display: flex;
            align-items: center;
            gap: 5mm;
            font-size: 14px;
          }
          .checkbox-square {
            width: 14px;
            height: 14px;
            border: 1px solid #000;
          }
        }
      </style>
    </head>
    <body>
      ${cardHTML()}
    </body>
    </html>
  `;

  const newWindow = window.open('', '', 'width=1200,height=800');
  newWindow.document.write(printContent);
  newWindow.document.close();
  newWindow.print();
}

document.getElementById('photo').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    document.getElementById('photoPreview').src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
});
