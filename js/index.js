(() => {
  "use strict";

  class ActivityTracker {
    constructor(activities) {
      this.activities = activities;
      this.links = document.querySelectorAll("a");
      this.activeCurrents = document.querySelectorAll(".activity__current");
      this.activePrevs = document.querySelectorAll(".activity__previous");

      this.timeframeLabels = {
        daily: "Last Day",
        weekly: "Last Week",
        monthly: "Last Month",
      };

      this.init();
    }


    updateUI(timeframe) {
      this.activities.forEach((activity, index) => {
        const { current, previous } = activity.timeframes[timeframe];

        this.activeCurrents[index].textContent = `${current}hrs`;
        this.activePrevs[index].textContent = `${this.timeframeLabels[timeframe]} - ${previous}hrs`;
      });

      this.saveSelectedTimeframe(timeframe);
    }

    setupEventListeners() {
      this.links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();

          this.links.forEach((otherLink) => otherLink.classList.remove("active"));
          link.classList.add("active");

          this.updateUI(link.dataset.timeframe);
        });
      });
    }

    saveSelectedTimeframe(timeframe) {
      localStorage.setItem("selectedTimeframe", timeframe);
    }

    loadSelectedTimeframe() {
      return localStorage.getItem("selectedTimeframe") || "weekly"; 
    }

    init() {

      const savedTimeframe = this.loadSelectedTimeframe();

      this.updateUI(savedTimeframe);

      this.links.forEach((link) => {
        if (link.dataset.timeframe === savedTimeframe) {
          link.classList.add("active");
        }
      });

      this.setupEventListeners();
    }
  }
  
  const activities = [
    {
      "title": "Work",
      "timeframes": {
        "daily": {
          "current": 5,
          "previous": 7
        },
        "weekly": {
          "current": 32,
          "previous": 36
        },
        "monthly": {
          "current": 103,
          "previous": 128
        }
      }
    },
    {
      "title": "Play",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 2
        },
        "weekly": {
          "current": 10,
          "previous": 8
        },
        "monthly": {
          "current": 23,
          "previous": 29
        }
      }
    },
    {
      "title": "Study",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 7
        },
        "monthly": {
          "current": 13,
          "previous": 19
        }
      }
    },
    {
      "title": "Exercise",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 5
        },
        "monthly": {
          "current": 11,
          "previous": 18
        }
      }
    },
    {
      "title": "Social",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 3
        },
        "weekly": {
          "current": 5,
          "previous": 10
        },
        "monthly": {
          "current": 21,
          "previous": 23
        }
      }
    },
    {
      "title": "Self Care",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 2,
          "previous": 2
        },
        "monthly": {
          "current": 7,
          "previous": 11
        }
      }
    }
  ]

  new ActivityTracker(activities);


})();