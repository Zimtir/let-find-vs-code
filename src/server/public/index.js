fetch("/getData")
  .then(r => r.json())
  .then(data => {
    if (data) {
      if (data instanceof Array && data.length > 0) {
        data = data.sort((a, b) => {
          let firstDate = new Date(a.time);
          let secondDate = new Date(b.time);
          return firstDate - secondDate;
        });

        data.map(d => {
          d.time = timeago.format(d.time);
        });

        var summary = [];

        const cumulate = arr => {
          for (let i = 0; i < arr.length; i++) {
            let entry = arr[i];

            let needAdd = true;
            for (let j = 0; j < summary.length; j++) {
              console.log(entry);
              if (entry.name === summary[j].name) {
                summary[j].value += entry.value;
                needAdd = false;
                break;
              }
            }

            if (needAdd) {
              summary.push({
                name: entry.name,
                value: entry.value
              });
            }
          }
        };

        var output = [];

        for (let i = 0; i < data.length; i++) {
          cumulate(data[i].entries);
          output.push({
            entries: JSON.parse(JSON.stringify(summary)),
            time: data[i].time
          });
        }

        console.log("summary", summary);
        console.log("output", output);
        const container = document.querySelector("#container");
        const stats = new BarChartRace(container, output);

        stats.start();
        window.addEventListener("resize", () => stats.resize());
      } else {
        var div = document.createElement("div");
        div.innerHTML = "Not data";
        document.getElementById("container").appendChild(div);
      }
    }
  });
