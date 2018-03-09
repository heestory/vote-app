<template>
  <div class="container">
    <div class="title">
      <h1>Let's VOTE</h1>
      <img src="../assets/vote.png" style="width:200px; height:200px">
    </div>

    <div class="input-wrap">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">TeamName</label>
          <div class="col-sm-7">
            <input class="form-control" id="" type="text" placeholder="Your Team" v-model:value="teamname">
          </div>
          <div class="col-sm-2">
            <button class="btn btn-primary" type="button" @click="findTeam">Go</button>
          </div>

        </div>
        <div class="create">
          You don't have a team? <router-link to="/create">Click me</router-link>
        </div>


      </form>
    </div>


  </div>
</template>

<script>
import db from './firebaseInit'
  export default {
    name:'goIndex',
    data (){
      return{
        msg:'hello',
        teamname:'',
        people:0
      }
    },
    methods:{
      findTeam: function(){
        db.collection('voteapp').where('teamname','==',this.teamname).get()
        .then(querySnapshot => {
          var tempWinner = [];
          querySnapshot.forEach(doc => {
           
              this.people=doc.data().people;
              console.log(this.people);
              console.log(this.teamname);
            
          })
        }).then(()=>{
          // this.$router.push({name:'playground',params:{teamname:this.this.teamname,}})
          window.location.href = '#/playground/'+this.teamname+'/'+this.people+'/go';
        })
      }
    }
  }
</script>

<style scoped>
  .container{
    width:960px;
    height:500px;
    margin: 0 auto;
    text-align: center;

  }
  .input-wrap{
    width:400px;
    height:100px;
    margin:0 auto;
    text-align: center;
  }
</style>
