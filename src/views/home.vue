<template>
	<div class="home">
		<div class="tabs">
			<router-link to="/home/star" class="item">星标</router-link>
			<router-link to="/home/team" class="item">团队</router-link>
			<router-link to="/home/my" class="item">我的</router-link>
		</div>
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'Home',
		components: {

		},
		data() {
			return {

			}
		}
	}
</script>
<style lang="scss" scoped>
	.home {
		padding: 15px 20px 0
	}

	.tabs {
		float: left;
		padding-top: 3px;
		.item{color: #fff;padding-bottom: 3px;font-size: 18px;}
		::v-deep .router-link-active{border-bottom:2px solid #2d8cf0;}
	}
	.item+.item{margin-left: 20px;}
	::v-deep .ivu-select-selection {
	    background-color: #0c1321;
	    border: none;
	}
</style>
