
import { LMap, LTileLayer} from 'vue2-leaflet'
import CustomMarker from 'vue-leaflet-custom-marker'
import map_marker from '@/assets/map-marker.png'

export default {
  name: 'HomeView',
  components: {
    LMap,
    LTileLayer,
    CustomMarker
  },
  computed : {
    marker () {
      return {
        lat: this.lat,
        lng: this.lang
      }
    },
    flag () {
      const flagtld = this.ipData?.country_tld
      return '//assets.ipapi.com/flags/' + flagtld.slice(1) + '.svg'
    }
  },
  data () {
    return {
      map_marker,
      ipAddress: null,
      crash: false,
      ipData: null,
      lat: null,
      lang: null,
      error: '',
      zoom: 6,
      ipInput: ''
    }
  },
  created () {
    // Link for getting current device ip
    const baseURI = 'https://api.ipify.org/?format=json'
    this.$http.get(baseURI)
      .then((result) => {
        this.ipAddress = result.data.ip
        this.ipInput = this.ipAddress
        const ip = this.ipAddress

        // passing the IP to get the information location, timezone, etc
        this.getLocationUsingIP(ip)
      }).catch((err) => {
        this.error = err
        this.crash = true
      })
  },
  methods: {
    getIpInfo(ipinput) {
      this.getLocationUsingIP(ipinput)
    },
    getLocationUsingIP (ip) {
      const ipapi = 'https://ipapi.co/' + ip + '/json/'
      this.$http.get(ipapi)
        .then((res) => {
          if (res.data.error) {
            this.error = res.data.reason
            this.ipData = ''
          } else {
            this.ipData = res.data
            this.lat = res.data.latitude
            this.lang = res.data.longitude
            return true
          }
        }).catch((err) => {
          this.error = err
          return false
        })
    }
  }
}
