// fetch("/getData")
//   .then(r => r.json())
//   .then(data => {
//     if (data) {
//       if (data instanceof Array && data.length > 0) {
//         data = data.sort((a, b) => {
//           let firstDate = new Date(a.time);
//           let secondDate = new Date(b.time);
//           return firstDate - secondDate;
//         });

//         data.map(d => {
//           d.time = timeago.format(d.time);
//         });

//         var summary = [];

//         const cumulate = arr => {
//           for (let i = 0; i < arr.length; i++) {
//             let entry = arr[i];

//             let needAdd = true;
//             for (let j = 0; j < summary.length; j++) {
//               if (entry.name === summary[j].name) {
//                 summary[j].value += entry.value;
//                 needAdd = false;
//                 break;
//               }
//             }

//             if (needAdd) {
//               summary.push({
//                 name: entry.name,
//                 value: entry.value
//               });
//             }
//           }
//         };

//         var output = [];

//         for (let i = 0; i < data.length; i++) {
//           cumulate(data[i].entries);
//           summary = summary.sort((a, b) => {
//             return b.value - a.value;
//           });
//           output.push({
//             entries: JSON.parse(JSON.stringify(summary)),
//             time: data[i].time
//           });
//         }

//         console.log(output);

//         const container = document.querySelector("#container");
//         const stats = new BarChartRace(container, output);

//         stats.start();
//         window.addEventListener("resize", () => stats.resize());
//       } else {
//         var div = document.createElement("div");
//         div.innerHTML = "Not data";
//         document.getElementById("container").appendChild(div);
//       }
//     }
//   });

fetch("/static/dataset.json")
  .then(r => r.json())
  .then(data => {
    if (data) {
      if (data instanceof Array && data.length > 0) {
        data.map(d => {
          d.time = timeago.format(new Date(d.year, 1, 1));
        });

        const container = document.querySelector("#container");
        const stats = new BarChartRace(container, data);

        stats.start();
        window.addEventListener("resize", () => stats.resize());
      } else {
        var div = document.createElement("div");
        div.innerHTML = "Not data";
        document.getElementById("container").appendChild(div);
      }
    }
  });
