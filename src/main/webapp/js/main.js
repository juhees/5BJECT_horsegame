$(function () {
  // flag : 각각의 이미지들이 골인지점에 도착했는지 true, false로 구분하기 위해서 ==> rank 산출과 도착한 이미지 움직이지 않도록 하기 위함
  var flag = new Array($(".horse").length);
  // imgpos : 각각 이미지들을 배열로 받고 fill() 함수를 사용하여 초기 좌표위치를 div의 가장 왼쪽좌표로 설정
  var imgpos = new Array($(".horse").length);
  // 인터벌초기화를 위한 변수
  var intervalhandle;

  $("#startbutton").click(function () {
    // pos : 이미지를 감싸고 있는 div의 제일 왼쪽 x좌표
    // maxpos : 이미지를 감싸고 있는 div의 제일 오른쪽 x좌표 == 도착하면 멈출 좌표이기도 하다.
    var pos = $("#startArea").offset().left;
    //var maxpos = pos + $("#runArea").outerWidth()-100;
    var maxpos = $("#finishArea").offset().left - 60;

    // 버튼 클릭시 기존의 텍스트 값들을 초기화
    $(".rank").text(" ");
    $("#timer").text("초");
    // rank : 도착 순위
    var rank = 1;

    // 이미지들의 초기 좌표 위치를 pos로 설정
    imgpos.fill(pos);
    // 모든 말들은 아직 출발선이다 도착x : false
    flag.fill(false);

    // 시작시간 저장 : 몇초 걸렸는지 확인하기 위해
    var startTime = new Date().getTime();

    // 이미 실행중인 인터벌이 있다면 지워버리고, 새로운 인터벌 생성 일정 시간마다 함수 실행
    clearInterval(intervalhandle);
    intervalhandle = setInterval(webtime, 200);

    function webtime(event) {
      // 현재 시간 저장 : 지속적으로 시간을 표시해주기 위해서, 말이 도착하면 현재 시간을 출력해주기 위해서
      var currentTime = new Date().getTime();

      // 말이 골지점까지 도착하는데 걸린 시간 = 현재시간 - 시작시간
      var timer = currentTime - startTime;
      // 타이머
      $("#timer").text(
        Math.floor(timer / 1000) + "." + Math.floor((timer % 1000) / 100) + "초"
      );
      // 배열을 돌면서 각각의 이미지들의 이동거리 랜덤으로 설정 및 이동
      for (index = 0; index < imgpos.length; index++) {
        // 이미지가 결승지점에 도착하지 않았다면 flag == flase
        // 결승지점을 통과한 이미지라면 실행 x
        if (!flag[index]) {
          // 랜덤으로 이동거리 설정
          imgpos[index] += Math.random() * 100 + 1;
          // 설정된 이동거리만큼 이동
          $("#horse" + (index + 1)).animate(
            {
              "margin-left": imgpos[index] + "px",
            },
            "fast"
          );

          // 이미지가 결승지점을 통과했는지 확인
          if (imgpos[index] >= maxpos) {
            //결승지점을 통과했으면 flag 를 true 로 변경해준다. 다음 반복부터 실행x
            flag[index] = true;
            // 현재까지 등수 표시
            $("#rank" + [index + 1]).text(
              "" +
                rank +
                "등 \n : " +
                Math.floor(timer / 1000) +
                "." +
                Math.floor((timer % 1000) / 100) +
                "초"
            );
            rank++;

            // rank를 확인해서 모든 말들이 결승지점을 도착했다면 ~
            if (rank > imgpos.length) {
              // 함수 반복 종료
              clearInterval(intervalhandle);
            }
          }
        }
      } // for문
    }
  });
});
