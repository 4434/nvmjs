<template>
  <div class="calendar_box">
    <div class="month_select_box">
      <div class="month_select">
        <div class="btn prev-year" @click="prevYear">上一年</div>
        <div class="btn prev" @click="prevMonth">上个月</div>
        <div class="show_time" @click="nowMonth">
          <span v-if="date.now">{{date.now.time}}</span>
        </div>
        <div class="btn next" @click="nextMonth">下个月</div>
        <div class="btn next-year" @click="nextYear">下一年</div>
      </div>
    </div>
    <div class="yk_calendar">
      <ul class="title">
        <li>周日</li>
        <li>周一</li>
        <li>周二</li>
        <li>周三</li>
        <li>周四</li>
        <li>周五</li>
        <li>周六</li>
      </ul>
      <ul class="box">
        <li
          v-for="(item, index) in date.showDate"
          :key="index"
          :class="item | classIndex(date)"
        >{{item.display + 1}}

		</li>
      </ul>
    </div>
  </div>
</template>
<script>
import calendar from "@/assets/js/develop/calendar.js";
import { filter } from "minimatch";
import { stringify } from "querystring";
let c = new calendar();

export default {
  name: "calendar",
  components: {},
  data() {
    return {
      date: {},
    };
  },
  filters: {
    classIndex(item, date) {
      if (item.type == "prev" || item.type == "next") {
        return "index";
      }
      if (item.display + 1 == date.now.day) {
        return "now";
      }
      return "";
    },
  },
  mounted() {
    this.date = c.showDate(c.timeFormat());
  },

  methods: {
    nowMonth() {
      this.date = c.showDate(c.timeFormat());
    },
    nextMonth() {
      this.date = c.showDate(c.nextTime(this.date.now.time));
    },
    prevMonth() {
      this.date = c.showDate(c.prevTime(this.date.now.time));
    },
    prevYear() {
      this.date = c.showDate(c.prevYear(this.date.now.time));
    },
    nextYear() {
      this.date = c.showDate(c.nextYear(this.date.now.time));
    },
  },
};
</script>

<style scoped>
.calendar_box{
  --color: #000;	
  --border: #abcdef;
  --weekend: red;
  --today: blue;
  --null: #999;
}
.calendar_box {
  width: 1000px;
  margin: 100px auto 0;
  border: 1px solid var(--border);
  border-bottom: 0;
}
.calendar_box ul.title {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--border);
}
.calendar_box ul.title li {
  width: 14.28%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  box-sizing: border-box;
  border-right: 1px solid var(--border);
}
.calendar_box ul.title li:last-child {
  border-right: 0;
}
.calendar_box ul.box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.calendar_box ul.box li {
  width: 14.28%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  box-sizing: border-box;
  color: var(--color);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  position: relative;
}
.calendar_box ul.box li:nth-child(7n) {
  color: var(--weekend);
}
.calendar_box ul.box li:nth-child(7n-6) {
  color: var(--weekend);
}
.calendar_box ul.box li.index {
  color: var(--null);
}
.calendar_box ul.box li.now {
  color: var(--today);
}
.calendar_box ul.box li:nth-child(7n) {
  border-right: 0;
}

.month_select_box {
  width: 100%;
  height: 60px;
  position: relative;
  border-bottom: 1px solid var(--border);
}
.month_select_box .month_select {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.month_select_box .month_select .btn {
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  user-select: none;
}
.month_select_box .month_select .show_time {
  width: 120px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}
.yk_calendar {
  width: 100%;
}
</style>