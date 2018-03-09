<template>
	<div class="container">
    <div class="track_wrap col-md-12">
      <div class="col-md-1" id="button_box">
        <button type="button" class="btn btn-primary btn-lg" v-bind:class="setDisable" id="button_box1" v-on:click="voting"><i class="fa fa-child fa-lg"></i></button>
      </div>
      <div class="col-md-2">
        <input type="text" class="form-control name" v-model:id="username">
      </div>

			<!--<div class="progress col-md-12">-->
			  <!--<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40"-->
			  <!--aria-valuemin="0" aria-valuemax="100" style="width:0%" v-bind:id="pkey">-->

			  <!--</div>-->

		</div>
	</div>
</template>

<script>
  import db from './firebaseInit'
	export default{
		name:'track',
    props:['pkey','teamname','totalcount','people','rflag','flag'],
		data (){
			return { 
				msg : 'track',
        usercount : 0,
        username :''
			}
		},
    methods:{
      voting: function(){

        if(this.rflag == true){
          this.usercount = 0;
        }

        if(this.totalcount <= this.people){
          this.$emit('click-child',this.pkey);
          console.log("click"+this.pkey);
          this.usercount++;
          console.log(this.usercount);
          this.updateVoteCount();
        }
        
      },
      updateVoteCount(){
        db.collection('voteapp').where('pkey','==',this.pkey).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.update({
                usercount: this.usercount,
                username:this.username
              })
                .then(()=>{
                  // this.$router.push({name:'view-employee',params:{employee_id:this.employee_id}})
                })
            })
          })
      }

    },
    created: function(){

      if(this.flag == 'go'){
        db.collection('voteapp').where('pkey','==',this.pkey).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.usercount= doc.data().usercount
              this.username = doc.data().username
              
            })
          })
      }else{
        db.collection('voteapp').add({
          pkey:this.pkey,
          teamname:this.teamname,
          username:null,
          usercount:0,
          totalcount:0,
          people:this.people,
          tempcount:0
        })
        .then(docRef =>{
              // this.$router.push('/')
        })
        .catch(error => console.log(err))
      }	  

    },
    computed:{
      setDisable: function(){
        return this.people <= this.totalcount ? 'disabled':'';
      }
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
