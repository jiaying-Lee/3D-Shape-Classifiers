import define1 from "./a33468b95d0b15b0@699.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["logs.csv",new URL("./files/ed6e880a5314cc23b71995755501647756e07c75145c91a06992fdc26a3adeda7f18f6b08b2087de0633abb30f83ed16f221446738308e9c7e520c3b0395f5af",import.meta.url)],["logs-svcnn@1.csv",new URL("./files/209d2d58ee05eff29a201e444106c50e4315468d9d054d7ea16d7f8d2b78bae7374b15027662a73c9fcb4f4fb324978a84c3bbf88d7d91b28084e2d5f210351e",import.meta.url)],["cm-mvcnn.csv",new URL("./files/650d2a37fb65d6f326e0001f64635e28304739089c900f7d7bedf2cd903ca45d984a75568ddf5b1db15f8d839b2aaa6e8547d218bf91489bbb4679ffba88173d",import.meta.url)],["logs-mvcnn@5.csv",new URL("./files/c4f2df87cc92fcebfaba214b7beb5c554b777ab32b474daf1d9c0cdcfd093beb4eb71ed675d4b17e65ed5aae42d85a9d27244c4342da0b14a5d208d5f90d350e",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Untitled`
)});
  main.variable(observer("logs_svcnn")).define("logs_svcnn", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment('logs-svcnn@1.csv').text(), d3.autoType)
    .map(d => ({
      epoch: d.epoch,
      loss: d.loss,
      val_acc: d.val_overall_acc
    }))
)});
  main.variable(observer("logs")).define("logs", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment('logs.csv').text(), d3.autoType)
    .map(d => ({
      epoch: d.epoch,
      loss: d.loss,
      val_acc: d.val_acc
    }))
)});
  main.variable(observer("logs_mvcnn")).define("logs_mvcnn", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment('logs-mvcnn@5.csv').text(), d3.autoType)
    .map(d => ({
      epoch: d.epoch,
      loss: d.loss,
      val_acc: d.val_overall_acc,
      val_acc_pc: d.val_mean_class_acc
    }))
)});
  main.variable(observer("data")).define("data", ["logs_mvcnn"], function(logs_mvcnn)
{
  var data = new Map()
  // data.set('pointnet', logs)
  data.set('mvcnn', logs_mvcnn)
  return data
}
);
  main.variable(observer()).define(["swatches","d3"], function(swatches,d3){return(
swatches({
  color: d3.scaleOrdinal(["Accuracy", "Loss"], ["#76b7b2", "#e15759"]),
  columns: "1000px"
})
)});
  main.variable(observer()).define(["d3","data"], function(d3,data)
{
  const margin = {top: 10, right: 30, bottom: 20, left: 25};
  const visWidth = 520 - margin.left - margin.right;
  const visHeight = 320 - margin.top - margin.bottom;
  
  const col = d3.scaleOrdinal(["pointnet", "mvcnn"], ["#2ca02c", "#9467bd", "#d62728"])
  const svg = d3.create('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom);
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const x = d3.scaleLinear()
      .domain([1, 30]).nice()
      .range([0, visWidth]);
  
  const y = d3.scaleLinear()
      .domain([0, 100]).nice()
      .range([visHeight, 0]);
  const y2 = d3.scaleLinear()
      .domain([0.0, 2.3]).nice()
      .range([visHeight, 0]);
  
  const xAxis = d3.axisBottom(x).ticks(15);
  const yAxis = d3.axisLeft(y);
  const yAxis2 = d3.axisRight(y2);
  
  g.append('g')
      .attr('transform', `translate(0,${visHeight})`)
      .call(xAxis);
  
  g.append('g')
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'black')
      .attr('x', 5)
      .text('Accuracy');
  g.append('g')
    .attr('transform', `translate(${visWidth}, 0)`)
      .call(yAxis2)
      .call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'black')
      .attr('x', -30)
      .text('Loss');
  
  const line = d3.line().x(d => x(d.epoch)).y(d => y(d.val_acc));
  const series = g.selectAll('.series')
    .data(data)
    .join('g')
      .attr('stroke', '#76b7b2') // this is where line color is set
      .attr('class', 'series')
    .append('path')
      .datum(([network, val_acc]) => val_acc)
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('d', line);
  
  const line2 = d3.line().x(d => x(d.epoch)).y(d => y2(d.loss));
  const series2 = g.selectAll('.series2')
    .data(data)
    .join('g')
      .attr('stroke', '#e15759') // this is where line color is set
      .attr('class', 'series2')
    .append('path')
      .datum(([network, loss]) => loss)
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('d', line2);
  
  // const line3 = d3.line().x(d => x(d.epoch)).y(d => y(d.val_acc_pc));
  // const series3 = g.selectAll('.series3')
  //   .data(data)
  //   .join('g')
  //     .attr('stroke', 'blue') // this is where line color is set
  //     .attr('class', 'series2')
  //   .append('path')
  //     .datum(([network, val_acc_pc]) => val_acc_pc)
  //     .attr('fill', 'none')
  //     .attr('stroke-width', 3)
  //     .attr('d', line3);
  return svg.node();
}
);
  main.variable(observer("cate")).define("cate", function(){return(
['bathtub','bed','chair', 'desk','dresser', 'monitor','night_stand','sofa','table','toilet']
)});
  main.variable(observer("cm_mvcnn")).define("cm_mvcnn", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment('cm-mvcnn.csv').text(), d3.autoType)
    .map(d => ({
      true_label: d.true_label,
      pred_label: d.pred_label,
      val: d.val
    }))
)});
  main.variable(observer()).define(["d3","cate","cm_mvcnn"], function(d3,cate,cm_mvcnn)
{  
  const margin = {top: 30, right: 10, bottom: 30, left: 100};
  const visWidth = 500;
  const visHeight = 500;

  const svg = d3.create('svg')
  .attr('width', visWidth + margin.left + margin.right)
  .attr('height', visHeight + margin.top + margin.bottom);

  const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
  const x = d3.scaleBand().domain(cate).range([0, visWidth]);
  const y = d3.scaleBand().domain(cate).range([0, visHeight]);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  var xa = g.append('g').attr('transform', `translate(0,${visHeight})`).call(xAxis)
    xa.selectAll("text").attr("y", 0).attr("x", 5)
    .attr("dy", ".35em").attr("transform", "translate(-15,30)rotate(-45)")
    .style("text-anchor", "start")

  var ya = g.append('g').call(yAxis)
    ya.selectAll("text").attr("y", 0).attr("x", 5)
    .attr("dy", ".35em").attr("transform", "translate(-18,0)")

  const color = d3.scaleSequentialPow(d3.interpolatePurples).exponent(1/2).domain([0,100])

//   g.selectAll('.false_data').data(false_data).join('rect')
//     .attr('class', 'false_data').attr('fill', '#f0f0f0')
//     .attr('x', d => x(d.yr)).attr('y', d => y(d.purpose))
//     .attr('width', visWidth/41 - 2).attr('height', d => visHeight/10 - 2)
  
  const rect = g.selectAll('.cm').data(cm_mvcnn).join('rect')
    .attr('class', 'cm').attr('fill', d => color(d.val))
    .attr('id', d => d.val)
    .attr('x', d => x(d.pred_label) + 1).attr('y', d => y(d.true_label))
    .attr('width', 48).attr('height', 48)

  

  svg.append("text").attr("transform", `translate(352, 14)`)
    .attr('fill', 'black')
    .text("Top 10 “Coalesced Purposes” of donations by year").attr('font-size', 18)
    .attr('font-family', 'sans-serif');
  return svg.node();
}
);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.import("swatches", child1);
  return main;
}
