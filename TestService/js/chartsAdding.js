

function addLineChart(data)
{
    $("#data").empty();

    $("#data").append('<canvas id="canvas"></canvas>');

    //var data = jQuery.parseJSON(json);

    var length = data.series[2].points.length;;
    var dataArray = [];
    var labelArray = [];
    var timestamp;
    var hour;
    var hourPrev = "";
    var minute;
    var minutePrev = "";
    var i;

    for (i = length - 1; i >=0; )
    {
            timestamp = parseInt(data.series[2].points[i].ts);
            hour = (new Date(timestamp)).getHours();
            minute = (new Date(timestamp)).getMinutes();
            if (hour.toString().length < 2) {
                hour = "0" + hour;
            }

            if (minute.toString().length < 2) {
                minute = "0" + minute;
            }

            if (hour === hourPrev && minute === minutePrev) {
                i--;
            }
            else {
                labelArray.push(hour + ":" + minute);
                dataArray.push(data.series[2].points[i].value);
                hourPrev = hour;
                minutePrev = minute;
            }
    }

    var lineChartData = {
        labels: labelArray.reverse(),
        datasets: [
        {
            label: "Температура",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(60,60,170,1)",
            pointColor: "rgba(30,30,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: dataArray.reverse()

        }
        ]

    }

    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {responsive: true});
}

function soundTable(data) {
    $("#data").empty();

    $("#data").append('<table class="table table-striped header-fixed"> <thead> <tr> <th>Время</th> <th>Состояние</th> </tr> </thead> <tbody></tbody>  </table>');

    //var data = jQuery.parseJSON(json);

    var length = data.series[3].points.length;
    var dataArray = [];
    var labelArray = [];
    var timestamp;
    var hour;
    var hourPrev = "";
    var minute;
    var minutePrev = "";
    var i;

    for (i = length - 1; i >= 0;) {
        timestamp = parseInt(data.series[3].points[i].ts);
        hour = (new Date(timestamp)).getHours();
        minute = (new Date(timestamp)).getMinutes();
        if (hour.toString().length < 2) {
            hour = "0" + hour;
        }

        if (minute.toString().length < 2) {
            minute = "0" + minute;
        }

        if (hour === hourPrev && minute === minutePrev) {
            i--;
        }
        else {
            labelArray.push(hour + ":" + minute);
            dataArray.push(data.series[3].points[i].value);
            hourPrev = hour;
            minutePrev = minute;
        }
    }

    for (i = 0; i < labelArray.length; i++) {
        $("table tbody").append('<tr> <td>' + labelArray[i] + '</td> <td>' + dataArray[i] + '</td> </tr>');
    }
}

function motionTable(data) {
    $("#data").empty();

    $("#data").append('<table class="table table-striped header-fixed"> <thead> <tr> <th>Время</th> <th>Активность</th> </tr> </thead> <tbody></tbody>  </table>');

    //var data = jQuery.parseJSON(json);

    var length = data.series[0].points.length;
    var dataArray = [];
    var labelArray = [];
    var timestamp;
    var hour;
    var hourPrev = "";
    var minute;
    var minutePrev = "";
    var i;

    for (i = length - 1; i >= 0;) {
        timestamp = parseInt(data.series[0].points[i].ts);
        hour = (new Date(timestamp)).getHours();
        minute = (new Date(timestamp)).getMinutes();
        if (hour.toString().length < 2) {
            hour = "0" + hour;
        }

        if (minute.toString().length < 2) {
            minute = "0" + minute;
        }

        if (hour === hourPrev && minute === minutePrev) {
            i--;
        }
        else {
            labelArray.push(hour + ":" + minute);
            dataArray.push(data.series[0].points[i].value);
            hourPrev = hour;
            minutePrev = minute;
        }
    }

    for (i = 0; i < labelArray.length; i++) {
        $("table tbody").append('<tr> <td>' + labelArray[i] + '</td> <td>' + dataArray[i] + '</td> </tr>');
    }
}

function humidityTable(data) {
    $("#data").empty();

    $("#data").append('<table class="table table-striped header-fixed"> <thead> <tr> <th>Время</th> <th>Уровень влажности</th> </tr> </thead> <tbody></tbody>  </table>');

    //var data = jQuery.parseJSON(json);

    var length = data.series[1].points.length;
    var dataArray = [];
    var labelArray = [];
    var timestamp;
    var hour;
    var hourPrev = "";
    var minute;
    var minutePrev = "";
    var i;

    for (i = length - 1; i >= 0;) {
        timestamp = parseInt(data.series[1].points[i].ts);
        hour = (new Date(timestamp)).getHours();
        minute = (new Date(timestamp)).getMinutes();
        if (hour.toString().length < 2) {
            hour = "0" + hour;
        }

        if (minute.toString().length < 2) {
            minute = "0" + minute;
        }

        if (hour === hourPrev && minute === minutePrev) {
            i--;
        }
        else {
            labelArray.push(hour + ":" + minute);
            dataArray.push(data.series[1].points[i].value);
            hourPrev = hour;
            minutePrev = minute;
        }
    }

    for (i = 0; i < labelArray.length; i++) {
        $("table tbody").append('<tr> <td>' + labelArray[i] + '</td> <td>' + dataArray[i] + '</td> </tr>');
    }
}

function getStatistic(data) {
    
    var i;

    var temp = 0;

    var wet = 0;
    var litWet = 0;
    var dry = 0;

    var length = data.series[1].points.length;
    for (i = 0; i < length; i++)
    {

        if (data.series[1].points[i].value === 'сухо') {
            dry++;
        } else {
            if (data.series[1].points[i].value === 'сыро') {
                wet++;
            } else {
                litWet++;
            }
        }
    }

    length = data.series[2].points.length;
    for (i = 0; i < length; i++)
    {

        temp += parseFloat(data.series[2].points[i].value);
    }
    temp /= length;

    var relax = 0;
    var active = 0;
    var notrelax = 0;

    length = data.series[0].points.length;
    for (i = 0; i < length; i++) {
        if (data.series[0].points[i].value === 'спокоен') {
            relax++;
        } else {
            if (data.series[0].points[i].value === 'двигается') {
                active++;
            } else {
                notrelax++;
            }
        }
    }

    var loud = 0;
    var queit = 0;
    var noizy = 0;
    length = data.series[3].points.length;
    for (i = 0; i < length; i++) {
        if (data.series[3].points[i].value === 'молчит') {
            queit++;
        } else {
            if (data.series[3].points[i].value === 'плачет') {
                loud++;
            } else {
                noizy++;
            }
        }
    }

    $("#data").append('<h2 style="margin-top: 110px">Сводка</h2>');
    $("#data").append('<ul></ul>');

    if (temp < 24) {
        $("#data").append('<li>Возможно, в комнате слишком прохладно</li>');
    } else {
        $("#data").append('<li>С температурой все в порядке</li>');
    }

    if (loud + noizy > queit) {
        $("#data").append('<li>Ребенок часто плачет</li>');
    } else {
        $("#data").append('<li>Ребенок слишком счастлив</li>');
    }

    if (active + notrelax > relax) {
        $("#data").append('<li>Ребенок гиперактивен</li>');
    } else {
        $("#data").append('<li>Ребенок обычно спокоен</li>');
    }
    

    if (wet + litWet > dry) {
        $("#data").append('<li>Ребенок слишком часто находится в сырой кроватке</li>');
    } else {
        $("#data").append('<li>Ребенок обычно сух</li>');
    }
}