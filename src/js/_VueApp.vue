<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  data: () => {
    console.log('vuejs is installed');
    return {
      message: 'Hey,this is Vue!',
    };
  },
};
</script>

<style scoped>
/* このコンポーネントだけに指定する方法（scoped） */
p {
  color: green;
}
</style>
