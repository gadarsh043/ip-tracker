<template>
  <div class="home" v-if="ipAddress">
    <span class="headline"> Your IP Address: {{ipAddress}}</span>
    <div class="ip" v-if="!error">
      <div class="ip_header">
        <input type="text" v-model="ipInput" class="ip_header-input">
        <button @click="getIpInfo(ipInput)" class="ip_header-submit">Search IP</button>
      </div>
      <div class="ip_body">
        <div class="ip_body_location">
          <div class="flag" v-if="ipData?.country_tld">
            <img :src="flag" alt="flag">
            <span>IP Location: {{ipData?.country_name}} ({{ipData?.country}})</span>
          </div>
          <div class="lat-lang">
            <div class="lat">
              <span class="heading">Latitude</span>
              <span class="detail">{{ipData?.latitude}} </span>
            </div>
            <div class="lat">
              <span class="heading">Latitude</span>
              <span class="detail">{{ipData?.longitude}} </span>
            </div>
          </div>
          <div class="lat-lang">
            <div class="lat">
              <span class="heading">CITY, STATE</span>
              <span class="detail">{{ipData?.city}} ({{ipData?.region}}) </span>
            </div>
            <div class="lat">
              <span class="heading">ZIP CODE</span>
              <span class="detail">{{ipData?.postal}} </span>
            </div>
          </div>
          <div class="lat-lang">
            <div class="lat">
              <span class="heading">CALLING CODE</span>
              <span class="detail">{{ipData?.country_calling_code}} </span>
            </div>
            <div class="lat">
              <span class="heading">CURRENCY</span>
              <span class="detail">{{ipData?.currency}} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error">
      <span>{{error}}</span>
    </div>
    <div v-if="ipData" class="mapBody">
      <l-map class="map" :zoom="zoom" :center="[lat, lang]">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
        <custom-marker :marker="marker">
          <img :src="map_marker" alt="marker" style="width: 50px; height: 50px;">
        </custom-marker>
      </l-map>
    </div>
  </div>
  <div v-else-if="crash">
    <span>Could not load the APIs.</span>
  </div>
  <div v-else>
    <span>Delay in API Call, Please be Patient!!! </span>
  </div>
</template>

<script src="./js/home-view.js">
</script>
<style scoped lang="scss">
  .home {
    background-color: #39587f;
    padding-top: 100px;
    height: 100%;
    .headline {
      width: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      top: 30px;
      color: white;
      font-size: 24px;
    }
  }
  .ip {
    background: #e4ecf9;
    width: 40%;
    height: 280px;
    border-radius: 12px;
    box-shadow: 1px 1px 5px 0 rgb(26 26 67 / 5%), 39px 62.5px 125px -25px rgb(50 50 93 / 20%), 23.4px 37.5px 75px -37.5px rgb(0 0 0 / 40%);
    transform: scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg);
    margin-left: auto;
    margin-right: auto;
    &_header {
      width: 100%;
      display: flex;
      left: -25px;
      position: absolute;
      top: -10px;
      &-input {
        width: 90%;
        font-size: 16px;
      }
      &-submit {
        widows: 10%;
        background: #26509a;
        color: #fff;
        cursor: pointer;
        font-size: 15px;
        border: unset;
      }
    }
    &_body {
      width: 100%;
      height: 100%;
      &_location {
        width: 100%;
        height: 50%;
        .flag {
          padding-top: 40px;
          padding-bottom: 10px;
          display: flex;   
          align-items: center;
          justify-content: space-evenly;
          border-bottom: 1px solid rgba(0, 0, 0, .075);
          img {
            width: 50px;
            height: 40px;
          }
          span {
            font-size: 20px;
            margin-left: -45px;
          }
        }
        .lat-lang {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, .075);
          .lat, .long {
            width: 50%;
            height: 60px;
            justify-content: center;
            align-items: center;
            display: inline-grid;
            border: 1px solid rgba(0, 0, 0, .075);
          }
        }
      }
    }
  }
  .mapBody {
    padding-top: 80px;
    display: flex;
    justify-content: center;
  }
  .map {
    width: 90%;
    height: 300px;
    position: relative;
    border: 8px solid black;
  }
  .heading {
    font-weight: 600;
    display: flex;
    justify-content: center;
  }
  .detail {
    font-style: italic;
    color: #000000c9;
    display: flex;
    justify-content: center;
  }
</style>
