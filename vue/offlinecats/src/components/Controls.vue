<template>
	<div class="buttons">
		<button @click="next(false)" class="btn btn--skip">Next one</button>
		<button @click="next(true)" class="btn btn--save">
			Save it!
		</button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
	name: 'Controls'
})
export default class Controls extends Vue {
	backgroundStyles: string = '';
	catPicBlob: Blob;
	async getNewPic() {
		this.$emit('resetPhoto');
		const API = 'https://cataas.com/cat?width=500&height=500';
		const response = await fetch(API, { cache: 'no-store' });
		this.catPicBlob = await response.blob();
		this.backgroundStyles = `background-image: url('${URL.createObjectURL(
			this.catPicBlob
		)}'`;
		this.$emit('setNewPhoto', this.backgroundStyles);
	}
	mounted() {
		this.getNewPic();
	}
	next(save: boolean) {
		this.$emit('removeActiveClass');
		save
			? this.$emit('savePhoto', this.catPicBlob)
			: this.$emit('doNotSavePhoto');
		this.getNewPic();
	}
}
</script>

<style scoped lang="stylus">
.buttons
  display flex
  justify-content space-between
  margin-top 30px
  width 500px
  margin 30px auto 0

.btn
  padding 0
  color #fff
  cursor pointer
  font-family 'Open Sans',sans-serif
  font-weight 800
  border-radius 30px
  padding 15px 20px
  border none
  font-size 26px
  text-transform uppercase
  &--skip
    background #441151
  &--save
    background #FF958C
</style>
