function doGet(e) {
  // 주차
  const week = 10;

  // 통합문서&시트 불러오기
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("23-2");

  // 시트의 머리글 받아오기 -> 행,열,라스트열번호
  const headers = ws.getRange(1, 1, 1, ws.getLastColumn()).getValues()[0];
  // 머리글에서 '출석' 제거하기
  headers.shift();

  // URL로 입력한 받은 쿼리문 받아오기
  const query = e.parameter;
  const runNum = query["runNum"]; //출석여부 반환 / 시트 입력
  const userNum = query["userNum"]; //학번

  // 시트에 입력된 데이터를 받아오기
  const data = ws.getRange("A1").getDataRegion().getValues();

  // 쿼리문에 runNum이 1이면 출석여부 반환
  // isHere : 이독이 아님 / O / X
  if (runNum == 1) {
    var isHere = "?";
    for (var i in data) {
      if (data[i][1] == userNum) {
        // 학번 찾기
        isHere = data[i][week + 1];
      }
    }
    if (isHere == "?") {
      return ContentService.createTextOutput(
        "이독 부원이 아니신데 여기 무슨 일이시죠?"
      );
    }
    return ContentService.createTextOutput(isHere); // O X
  }

  // 쿼리문에 runNum이 2이면 시트에 출석체크 등록
  else {
    for (var i in data) {
      if (data[i][1] == userNum) {
        // 학번 찾기
        var a = parseInt(parseInt(i) + 1);
        var b = parseInt(week + 2);
        ws.getRange(a, b).setValue("O");
      }
    }
    return ContentService.createTextOutput("출석완료");
  }
}
