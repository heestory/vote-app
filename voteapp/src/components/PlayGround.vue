<template>
	<div class="container playground">
		<header class="row" id="header">
			<div class="col-md-4" id="title">
				<h1><i class="fa fa-users"></i>  {{$route.params.teamname}} {{totalCount}}</h1>
			</div>
			<div class="col-md-8" id="button">
				<button type="button" class="btn btn-danger">Reset</button>
        <router-link type="button" class="btn btn-warning" to="/">Cancel</router-link>
			</div>
		</header>
		<article class="row" >
			<div class="col-md-3" >
				<track-component v-for="n in people" :pkey="`id_`+n" :key="`id_`+n" v-on:click-child="onClickChild"/>
			</div>
      <div class="col-md-9">
        <div class="img" id="votebox">
          <img v-if="imgFlag" src="../assets/close.gif" style="width:300px; height:400px">
          <img src="../assets/giphy.gif" style="width:300px; height:400px" v-else>
        </div>
      </div>
		</article>
    <footer class="row">
      <i class="fa fa-copyright"> HeeJeong</i><br/>
      <i class="fa fa-envelope"> jeongh389@gmail.com</i>
    </footer>
	</div>
</template>

<script>
import	TrackComponent from './Track.vue'

	export default{
		name:'playGround',
		data(){

			return {
				msg: 'playGround',
				people: parseInt(this.$route.params.people),
        totalCount : 0,
        imgFlag:true
			}
		},
		components:{
			TrackComponent
		},
    methods:{
      onClickChild(value) {
        console.log(value) // someValue
        this.imgFlag = false;
        console.log(this.imgFlag);
        this.totalCount++;
        setTimeout(()=>{ this.imgFlag = true;  console.log(this.imgFlag);}, 100);

      }

    }



	}
</script>

<style scoped>
  .playground{
    margin:0 auto;
  }
	#title{
		border-bottom: 1px solid;
	}
	article{
    margin-top:30px;
	}
  #button{
    margin-top:15px;
  }
  .img{
    margin-top:-50px;

  }
  footer{
    margin-top:50px ;
    border-top:1px solid;
  }


</style>

