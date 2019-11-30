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

        console.log(data);
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
