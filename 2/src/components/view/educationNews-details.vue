<template>
	<div class="educationNews-details">
		<!--header-->
		<MyHeader :HeaderContent = 'headerContent'></MyHeader>
		<!--title-->
		<p class="title">{{title}}</p>
		<!--日期、来源、作者-->
		<ol class="date">
			<li>{{dateList.Date}}</li>
			<li>{{dateList.source}}</li>
			<li>{{dateList.author}}</li>
		</ol>
		<!--img-->
		<div class="img">
			<img src="../../../static/img/educationNews_banner1.png"/>
		</div>
		<!--content-->
		<p class="content">{{content}}</p>
	</div>
</template>

<script>
	import MyHeader from '../public/myHeader'
	export default {
		data() {
			return {
				//header
				headerContent: {
					path: '/educationNews',
					title: '详情',
					login: '登录'
				},
				//title
				title: '贵安新区：理清思想虚功实作推动发展贵安新区：理清思想虚功实作推动发展贵安新区：理清思想虚功实作推动发展贵安新区：理清思想虚功实作推动发展',
				//日期、来源、作者
				dateList: {
					Date: '日期：2018年4月20日',
					source: '来源：xxx教育局',
					author: '作者：xxx'
				},
				//content
				content: ' 省政协副主席谢晓尧,省政协秘书长李月成,新区党工委书记马长青,新区领导王春雷参加调研。王富玉一,新实席谢晓尧青,新区领导王春雷参加调研。王富玉一行实地调研了住澳省政协委员省政协副主席省政协副主席谢晓尧,省政协秘书长李月成,新区党工委书记马长青,新区领导王春雷参加调研。王富玉一行实地调研了住澳省政协委员省政协副主席省政协副主席谢晓尧,省政协秘书长李月成,新区党工委书记马长青,新区领导王春雷参加调研。王富玉一行实地调研了住澳省政协委员省政协副主席谢晓尧,省政协秘书长李月成,新区党工委书记马长青,新区领导王春雷参加调研。王富玉一行实地调研了住澳省政协委员省政协副主席谢晓尧,省政协秘书长李月成,新区党工委书记马长青,新区领导王春雷参加调研。王富玉一行实地调研了住澳省政协委员省政协副主席谢晓尧,省政协秘书长李月成,新区党工委书记马长青,新区领导王春雷参加调研。王富玉一行实地调研了住澳省政协委员'
			}
		},
		components: {
			MyHeader
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.educationNews-details {
		height: 100%;
	}
	/*title*/
	.title {
		width: 100%;
		color: #333333;
		font-size: 0.65rem;
		padding: 0.75rem 0.75rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	/*日期、来源、作者*/
	.date {
		display: flex;
		padding: 0 0.75rem 0.75rem 0.75rem;
	}
	.date li {
		color: #999999;
		text-align: center;
		flex: 1;
		font-size: 0.5rem;
	}
	.date li:nth-child(1) {
		text-align: left;
	}
	/*img*/
	.img {
		height: 9.1rem;
		padding: 0 0.75rem;
		line-height: 9.1rem;
	}
	.img img {
		width: 100%;
		vertical-align: middle;
		border-radius: 0.5rem;
	}
	/*content*/
	.content {
		padding: 0.2rem 0.75rem;
		font-size: 0.6rem;
		color: #333333;
		line-height: 1rem;
		margin-bottom: 3.75rem;
	}
</style>