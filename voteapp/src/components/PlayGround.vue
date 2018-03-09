<template>
	<div class="container playground">
		<header class="row" id="header">
			<div class="col-md-4" id="title">
				<h1><i class="fa fa-users"></i>  {{$route.params.teamname}} {{totalcount}}</h1>
			</div>
			<div class="col-md-8" id="button">
        <router-link type="button" class="btn btn-info" to='/'>Home</router-link>
				<button type="button" class="btn btn-danger" v-on:click="reset">Reset</button>
        <button type="button" class="btn btn-warning" v-on:click="deleteCancel">Delete</button>
			</div>
		</header>
		<article class="row" >
			<div class="col-md-4" >
				<track-component v-for="n in people" :people="people" :pkey="teamname+`_`+n" :key="`id_`+n"  :teamname="teamname" :totalcount="totalcount" :rflag="rflag" :flag="flag" :tempcount="tempcount" v-on:click-child="onClickChild"/>
			</div>
      <div class="col-md-8">
        <div class="img" id="votebox">
          <img v-if="imgFlag" src="../assets/giphy.gif" style="width:300px; height:400px">
          <img src="../assets/close.gif" style="width:300px; height:400px" v-else>
        </div>
        <div class="result-btn">
            <button v-if="people == totalcount" type="button" class="btn btn-info" v-on:click="resultBox">Result</button>
        </div>
      </div>
		</article>
    <footer class="row">
      <i class="fa fa-copyright"> HeeJeong</i><br/>
      <i class="fa fa-envelope"> jeongh389@gmail.com</i>
    </footer>

    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" id="result-modal"data-target="#myModal" style="display:none"></button>

  <div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Winner</h4>
      </div>
      <div class="modal-body">
        <p>
          <span v-for="winners in winner">
            {{winners.usercount}}
          </span>
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

	</div>
</template>

<script>
import	TrackComponent from './Track.vue'
import db from './firebaseInit'

	export default{
		name:'playGround',
		data(){
			return {
				msg: 'playGround',
				people: parseInt(this.$route.params.people),
        totalcount : 0,
        imgFlag:false,
        tempcount:0,
        teamname: this.$route.params.teamname,
        winner:null,
        rflag:false,
        flag:this.$route.params.flag

			}
		},
		components:{
			TrackComponent
		},
    methods:{
      onClickChild(value) {
        console.log(value) // someValue      
       
        if(++this.tempcount <= this.people){
          this.imgFlag = true;
          this.totalcount++;
          this.updateTotalCount();
          setTimeout(()=>{ this.imgFlag = false;  console.log(this.imgFlag);}, 100);
        }

      },
      updateTotalCount(){
        db.collection('voteapp').where('teamname','==',this.teamname).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.update({
                totalcount: this.totalcount,
                tempcount :this.tempcount
              })
                .then(()=>{
                  // this.$router.push({name:'view-employee',params:{employee_id:this.employee_id}})
                })
            })
          })

      },
      resultBox(){ 
        db.collection('voteapp').where('teamname','==',this.teamname).orderBy("usercount","desc").get()
        .then(querySnapshot => {
          var tempWinner = [];
          querySnapshot.forEach(doc => {
           
              tempWinner.push({'usercount':doc.data().usercount,'username':doc.data().username})
       
          })
          console.log(tempWinner);
           var winner = tempWinner[0];
            var result = [];
            for(var i = 0; i<tempWinner.length; i++){
              winner.usercount == tempWinner[i].usercount ? result.push(tempWinner[i]):''
            }
            this.winner = result;
            console.log(this.winner);

            document.getElementById('result-modal').click();

        })
       
      },
      deleteCancel(){
        if(confirm('Are you sure?')){
          db.collection('voteapp').where('teamname','==',this.teamname).get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.delete()
                this.$router.push('/')
              })
            })
        }
      },
      reset(){
         db.collection('voteapp').where('teamname','==',this.teamname).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.update({
                totalcount: 0,
                usercount:0
              })
                .then(()=>{
                  this.totalcount = 0;
                  this.tempcount = 0;
                  this.rflag = true;
                  this.tempcount = 0;
                  // this.$router.push({name:'view-employee',params:{employee_id:this.employee_id}})
                })
            })
          })
          this.rflag = false;
      }

    },
    created: function(){
      if(this.flag == 'go'){
         db.collection('voteapp').where('teamname','==',this.teamname).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.totalcount= doc.data().totalcount
              this.tempcount = doc.data().tempcount
              
            })
          })
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

