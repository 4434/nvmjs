<template>
  <div class="svg-box">
    <div class="svg-list">
      <svg xmlns="http://www.w3.org/2000/svg">
        <g> 
          <rect id="a" width="100" height="100" x="180" y="150" rx="10" ry="10" fill="#000">
            <animateTransform attributeName="transform" begin="0s" dur="5s" type="rotate" from="0 230 200" to="360 230 200" repeatCount="indefinite"/>
          </rect>
        </g>
      </svg> 
    </div>
    <div class="svg-list">
      <svg xmlns="http://www.w3.org/2000/svg">
        <g> 
          <rect id="one" width="48%" height="48%" x="1%" y="1%" rx="10" ry="10" style="fill:rgba(0, 121, 0, 0);stroke-width:1;stroke:rgb(0,0,0)">
            <!-- <animateTransform attributeName="transform" begin="0s" dur="5s" type="rotate" from="0 230 200" to="360 230 200" repeatCount="indefinite"/> -->
            <animate attributeName="width"  to="98%" begin="one.click" dur="3s" fill="freeze" />
            <animate attributeName="height" to="98%" begin="one.click" dur="3s" fill="freeze" />
          </rect>
          <rect width="48%" height="48%" x="51%" y="1%" rx="10" ry="10" style="fill:rgba(0, 121, 0, 0);stroke-width:1;stroke:rgb(0,0,0)">
            <animate attributeName="x"  to="98%" begin="one.click"    dur="3s"    fill="freeze" />
            <animate attributeName="width"  to="0%" begin="one.click" dur="3s" fill="freeze" />
            <animate attributeName="height" to="0%" begin="one.click" dur="3s" fill="freeze" />
          </rect>
          <rect width="48%" height="48%" x="1%" y="51%" rx="10" ry="10" style="fill:rgba(0, 121, 0, 0);stroke-width:1;stroke:rgb(0,0,0)">
            <!-- <animateTransform attributeName="transform" begin="0s" dur="5s" type="rotate" from="0 230 200" to="360 230 200" repeatCount="indefinite"/> -->
          </rect>
          <rect width="48%" height="48%" x="51%" y="51%" rx="10" ry="10" style="fill:rgba(0, 121, 0, 0);stroke-width:1;stroke:rgb(0,0,0)">
            <!-- <animateTransform attributeName="transform" begin="0s" dur="5s" type="rotate" from="0 230 200" to="360 230 200" repeatCount="indefinite"/> -->
          </rect>
        </g>
      </svg>      
    </div>
    <div class="svg-list">
    </div> 
    <div class="svg-list">
    </div> 
    <div class="svg-list">
    </div>    
    <div class="svg-list">
    </div>
    <div class="svg-list">
    </div> 
  </div>
</template>
<script>
export default {
  name: "svg-box",
  components: {},
  data() {
    return {
      date: {},
    };
  },
  mounted() {

  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
.svg-box{
  display: flex;
  flex-wrap: wrap;
  --border-color: red;
  .svg-list{
    width: 25%;
    height: 400px;
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    svg{
      width: 100%;
      height: 100%;
    }
  }
}
</style>