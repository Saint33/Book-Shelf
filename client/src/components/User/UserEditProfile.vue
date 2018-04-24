<template>
    <div class="row">
        <div class="col-8">
            <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Имя</label>
      <input type="text" class="form-control" id="inputEmail4" >
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Фамилия</label>
      <input type="text" class="form-control" id="inputPassword4" >
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Откуда вы?</label>
    <input type="text" class="form-control" id="inputAddress" >
  </div>
<div class="form-group">
    <label for="inputAddress">Род занятий</label>
    <input type="text" class="form-control" id="inputAddress" >
  </div>
<div class="form-group">
    <label for="inputAddress">Какими устройствами для чтения электронных книг пользуетесь?</label>
    <input type="text" class="form-control" id="inputAddress" >
  </div>
  <div class="form-group">
    <label for="inputAddress">Ваш сайт</label>
    <input type="text" class="form-control" id="inputAddress" >
  </div>
    <div class="form-group">
    <label for="inputAddress">Расскажите о себе</label>
    <textarea type="text" class="form-control" id="inputAddress" />
  </div>
  <div class="form-group">
    <label for="inputAddress2"></label>
    <input type="text" class="form-control" id="inputAddress2" >
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
        </div>


    </div>
</template>

<script>
    export default {
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss">
    
</style>