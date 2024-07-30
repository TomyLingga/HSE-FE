<template>
<v-app>
    <v-main class="grey lighten-3">
        <router-view/>
    </v-main>
</v-app>

</template>

<script>
import moment from 'moment';

const date = new Date();
export default {
    data() {
        return {
            links: [
                'Dashboard',
                'Messages',
                'Profile',
                'Updates',
            ],
            tgl: moment(new Date).format("YYYY-MM-DD"),
            dateTanggal: {
                tahun: moment(new Date).format("YYYY"),
                bulan: moment(new Date).format("MM"),
                tanggal: moment(new Date).format("DD"),
            },
            dateTime: {
                hours: moment(date).format("HH"),
                minutes: moment(date).format("mm"),
                seconds: moment(date).format("ss"),
            },
            timer: undefined,
        }
    },
    methods:{
        setDateTime() {
            const date = new Date();
            this.dateTanggal = {
                tahun: moment(new Date).format("YYYY"),
                bulan: moment(new Date).format("MM"),
                tanggal: moment(new Date).format("DD"),
            }
            this.dateTime = {
                hours: moment(date).format("HH"),
                minutes: moment(date).format("mm"),
                seconds: moment(date).format("ss"),
            };
        },
    },
    beforeMount() {
        this.timer = setInterval(this.setDateTime, 1000);
    },
    beforeUnmount() {
        clearInterval(this.timer);
    },
}
</script>