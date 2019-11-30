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

        let output = [];
// FIX THIS
        for (let i = 0; i < data.length; i++) {
          let outputElement = null;
          if (i > 0) {
            outputElement = {
              time: data[i].time,
              entries: data[i - 1].entries
            };

            data[i].entries.map(entry => {
              console.log(data[i], entry);
              let foundedEntry = outputElement.entries.find(
                previousEntry => previousEntry.name === entry.name
              );

              let flagComplete = false;
              for (let j = 0; j < outputElement.entries.length; j++) {
                if (outputElement.entries[j].name === entry.name) {
                  outputElement.entries[j].value += entry.value;
                  flagComplete = true;
                }
              }
              if (!flagComplete) {
                outputElement.entries.push({
                  name: entry.name,
                  value: entry.value
                });
              }
            });

            outputElement.entries = outputElement.entries.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });

            output.push(outputElement);
          }
        }

        console.log(output);

        output.map(d => {
          d.time = timeago.format(d.time);
        });

        console.log(output);
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
