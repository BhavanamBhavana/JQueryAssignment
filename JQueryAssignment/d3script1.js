function redraw(data){
  var outerWidth = 1000;
  var outerHeight = 500;
  var margin = { left: 70, top: 30, right: 30, bottom: 50 };
  var xColumn = "Year";
  var yColumn = "Value";

  var xAxisLabelText = "Year";
  var xAxisLabelOffset = 48;

  var yAxisLabelText = "Value";
  var yAxisLabelOffset = 40;

  var innerWidth  = outerWidth  - margin.left - margin.right;
  var innerHeight = outerHeight - margin.top  - margin.bottom;

  var svg = d3.select(".gdata").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight);
  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var path = g.append("path")
    .attr("class", "chart-line");
  var path1 = g.append("path")
      .attr("class", "chart-line");

  var xAxisG = g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + innerHeight + ")");
  var xAxisLabel = xAxisG.append("text")
    .attr("transform", "translate(" + (innerWidth / 2) + "," + xAxisLabelOffset + ")")
    .attr("class", "label")
    .text(xAxisLabelText);

  var yAxisG = g.append("g")
    .attr("class", "axis");
  var yAxisLabel = yAxisG.append("text")
    .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
    .attr("class", "label")
    .text(yAxisLabelText);

  var xScale = d3.time.scale().range([0, innerWidth]);
  var yScale = d3.scale.linear().range([innerHeight, 0]);

  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
            //  .tickFormat(d3.time.format("%Y"));

  var yAxis = d3.svg.axis().scale(yScale).orient("left");

  var line = d3.svg.line()
    .x(function(d) { return xScale(new Date(d[xColumn],0,1));})
    .y(function(d) { return yScale(d[yColumn]); });

    var urbarr=[];
    var rurarr=[];
    var arr_date=[];
    var arr_vals=[];

    data.forEach(function(d){
      arr_vals.push(d["Value"]);
    });
    console.log(arr_vals.length);

    // for(var i=0;data.length;i++){
    //   var str = data[i]["Value"];
    //   arr_vals[i] = str;
    // }
    var max=0;
    max = arr_vals[0];
    for(var i=0;i<arr_vals.length;i++){
      console.log("i");
      if(arr_vals[i]>max){
        max = arr_vals[i];
      }
    }
    console.log(max);

    data.forEach(function(d){
      var obj={};
     obj['Year'] = new Date(d.Year,0);
     arr_date.push(obj);
  });

      for( var i=0;i<data.length;i++){
        if(data[i]["IndicatorName"]=="Urban population (% of total)"){
          urbarr.push(data[i]);
        }
        else if(data[i]["IndicatorName"]=="Rural population (% of total population)"){
          rurarr.push(data[i]);
        }
      }
    xScale.domain(d3.extent(arr_date, function (d){ return d[xColumn]; }));
    yScale.domain([0, d3.max(data, function (d){ return parseInt(d[yColumn]); })]);
  //  console.log(d3.max(data, function (d){ return d[yColumn]; }));
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    path.attr("d", line(urbarr));
    path1.attr("d", line(rurarr));
}
