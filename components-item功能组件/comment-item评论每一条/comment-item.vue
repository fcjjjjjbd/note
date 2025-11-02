<template>
	<view class="commentItem">

		<view class="outer">
			<view class="avatar">
				<!-- #ifdef MP-WEIXIN -->
				<image class="pic" :src="newitem.userInfo.avatar ||  'https://mp-809a65a0-175d-4ce6-b53d-81522f24f79b.cdn.bspapp.com/userAvatar/logo.png'" mode="aspectFill">
				</image>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<image class="pic" :src="picUrl" mode="aspectFill"></image>
				<!-- #endif -->
			</view>

			<view class="content">
				<view class="userinfo">
					<view class="left">
						<view class="name">{{newitem.userInfo.username}} </view>
						<view class="time"><uni-dateformat :date="newitem.comment_date" :threshold="[60000, 3600000]"
								format="yyyy/MM/dd hh:mm"></uni-dateformat></view>
					</view>
					<view class="right">
						<view class="like" @click="likedz">
							<view class="num" :style="`color: ${newitem.likeInfo? '#dd524d' : '#a7a7a7'}`"
								v-if="newitem.like_count>0">{{newitem.like_count}}</view>
							<uni-icons v-if="!newitem.likeInfo" type="hand-up" size="20" color="#a7a7a7"></uni-icons>
							<uni-icons v-else type="hand-up-filled" size="20" color="#dd524d"></uni-icons>
						</view>
						<view class="remove" @click="deletee"
							v-if="!type && !newitem.bool_remove && (newitem.userInfo._id == current_id || isAdminRole())">
							<uni-icons type="trash" size="20" color="#a7a7a7"></uni-icons>

						</view>
					</view>
				</view>
				<view class="reply" @click="detaill">
					<text :class="newitem.bool_remove==true ?'commentremove':''"> {{newitem.comment_content}}</text>
					<text class="text" v-if="newitem.replayinfo">
						// @回复 <text class="nickname">@李四</text>：
						{{ newitem.replayinfo.comment_content}}
					</text>

				</view>
			</view>
		</view>
		<!-- v-if="  -->
		<view class="subReply">
			<view class="list" @click="detaill" v-if="!isreplay && newitem.childcount>0">
				<view class="row" v-for="row in newitem.child2info" :key="row._id">
					{{row.username}}：{{ row.comment_content }}
				</view>

				<view class="row more" v-if="item.childcount>2">共{{newitem.childcount}}条回复
					<uni-icons type="right" color="#a7a7a7" size="16"></uni-icons>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		isAdminRole
	} from "@/utils/common"
	import debounce from "lodash.debounce"
	const db = uniCloud.database()
	const current_id = ref(uniCloud.getCurrentUserInfo().uid)

	const emit = defineEmits(['replay', 'deleter'])
	const props = defineProps({
		isreplay: {
			type: Boolean,
			default: false
		},
		morereplay: {
			type: Boolean,
			default: false
		},
		type: {
			type: Boolean,
			default: false
		},
		item: Object
	})

	const newitem = ref(props.item)
	watch(() => props.item, (nv) => {
		newitem.value = nv
	})

	// h5图片 URL
	const picUrl = computed(() => {
		if (!newitem.value.userInfo.avatar_file) {
			return 'https://mp-809a65a0-175d-4ce6-b53d-81522f24f79b.cdn.bspapp.com/userAvatar/logo.png'; // 默认图片路径
		}
		const {
			url,
			extname
		} = newitem.value.userInfo.avatar_file;
		return `${url}.${extname}`; // 拼接 URL 和扩展名
	});
	// 点击整个item评论
	const detaill = () => {
		if (!props.isreplay) {
			uni.navigateTo({
				url: '/pages/detail/replay'
			})
			uni.setStorageSync("storage_comment", props.item);
		}
		if (props.morereplay) {
			emit("replay", props.item)

		}
	}

	// 点赞 
	const likedz = debounce(likeFn, 1500, {
		'leading': true,
		'trailing': false
	})

	function likeFn() {
		if (newitem.value.likeInfo) {
			newitem.value.like_count--
			db.collection("goods_like").where({
				soup_id: newitem.value.soup_id,
				comment_id: newitem.value._id,
				like_type: 1,
				user_id: current_id
			}).remove();
		} else {
			newitem.value.like_count++
			db.collection("goods_like").add({
				soup_id: newitem.value.soup_id,
				comment_id: newitem.value._id,
				like_type: 1
			})
		}
		newitem.value.likeInfo = !newitem.value.likeInfo
		uni.$emit('like', {
			_id: newitem.value._id,
			collect_count: newitem.value.like_count,
			likeInfo: newitem.value.likeInfo
		})

	}
	// 删除 console.log()
	const deletee = async () => {
		let res1 = await uni.showModal({
			title: '删除',
			content: '是否删除评论',
		});
		if (!res1.confirm) return;
		let {
			result: {
				errCode
			}
		} = await db.collection("goods_comment").doc(newitem.value._id).remove();
		if (errCode == 0) uni.$emit("deleter")

	}
</script>

<style lang="scss" scoped>
	.commentItem {
		padding: 30rpx;

		.outer {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;

			.avatar {
				width: 60rpx;
				height: 60rpx;
				margin-right: 20rpx;
				border-radius: 50%;
				overflow: hidden;

				.pic {
					width: 100%;
					height: 100%;
				}
			}

			.content {
				flex: 1;

				.userinfo {
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left {
						.name {
							font-size: 26rpx;
							color: $text-font-color-2;
						}

						.time {
							font-size: 22rpx;
							color: $text-font-color-3;
						}
					}

					.right {
						color: $text-font-color-3;
						font-size: 22rpx;
						display: flex;
						align-items: center;

						.like {
							display: flex;
							align-items: center;
							padding: 3rpx 10rpx;

							.num {
								margin-right: 5rpx;
							}
						}

						.remove {
							padding: 3rpx 10rpx;
							margin-left: 20rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}

				.reply {
					padding: 20rpx 0;
					font-size: 30rpx;
					color: $text-font-color-1;
					line-height: 1.7em;

					.text {
						color: $text-font-color-3;

						.nickname {
							color: $brand-theme-color;
						}
					}
				}

			}
		}

		.subReply {
			padding-left: 80rpx;

			.list {
				background: #f4f4f4;
				padding: 20rpx;
				border-radius: 10rpx;

				.row {
					line-height: 1.8em;
					font-size: 28rpx;
					color: $text-font-color-2;
				}

				.more {
					color: $text-font-color-3;
				}
			}
		}
	}
</style>