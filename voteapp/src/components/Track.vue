<template>
	<div class="container">
    <div class="track_wrap col-md-12">
      <div class="col-md-1" id="button_box">
        <button type="button" class="btn btn-primary btn-lg" id="button_box1" v-on:click="voting"><i class="fa fa-child fa-lg"></i></button>
      </div>
      <div class="col-md-2">
        <input type="text" class="form-control input-sm name" id="usr">
      </div>

			<!--<div class="progress col-md-12">-->
			  <!--<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40"-->
			  <!--aria-valuemin="0" aria-valuemax="100" style="width:0%" v-bind:id="pkey">-->

			  <!--</div>-->

		</div>
	</div>
</template>

<script>
	export default{
		name:'track',
    props:['pkey'],
		data (){
			return {
				msg : 'track'
			}
		},
    methods:{
      voting: function(){
        this.$emit('click-child','childe!!');
        console.log("click"+this.pkey);
      }
    },
    created: function(){
		  console.log('hjello');
    }
	}
</script>

<style scoped>

  .name{
    margin-top:10px;
  }

  .track_wrap{
    margin-top:20px;
    margin-left:100px;
  }

</style>
