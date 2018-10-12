<template>
	<ul class="myheader">
		<li @click="back()"><i class="el-icon-arrow-left"></i></li>
		<li>{{HeaderContent.title}}</li>
		<li @click="login()">{{HeaderContent.login}}</li>
	</ul>
</template>

<script>
	export default {
		props: ['HeaderContent'],
		data() {
			return {
				
			}
		},
		methods: {
			//返回
			back() {
				this.$router.push({
					path: this.HeaderContent.path
				})
			},
			//登录
			login() {
				
			}
		}
	}
</script>

<style scoped>
    .myheader {
    	display: flex;
    	height: 2.2rem;
    	padding-top: 1rem;
    	background: white;
    	padding: 0 0.75rem;
    	border-bottom: 1px solid #dbdbdb;
    }
    .myheader li {
    	height: 2.2rem;
    	line-height: 2.2rem;
    	font-size: 0.75rem;
    	color: #0284dc;
    }
    .myheader li:nth-child(1) {
    	padding-right: 0.5rem;
    }
    .myheader li:nth-child(2) {
    	flex: 1;
    	text-align: center;
    }
    .myheader li:nth-child(3) {
    	padding-left: 0.5rem;
    }
</style>