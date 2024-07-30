<style>
    .blink {
        font-size: 20px;
        font-weight: bold;
        color: #2d38be;
        transition: 0.5s;
    }
</style>
<template>
    <v-container fluid>
        <!-- <v-row>
            <v-col cols="3" class="text-center">
                <v-container>
                    <strong class="text-h4">HSE DASHBOARD</strong>
                </v-container>
            </v-col>
            <v-col cols="6" class="text-center">
            </v-col>
            <v-col cols="3">
                <v-container class="text-right">
                    <img
                    elevation="20"
                    src="inl.png"
                    height="30"
                    class="mr-4"
                    >
                    <img
                    elevation="20"
                    src="holding2.png"
                    height="30"
                    class="mr-4"
                    >
                    <img
                    elevation="20"
                    src="bumn.png"
                    height="30"
                    >
                </v-container>
            </v-col>
        </v-row> -->
        <v-row justify="center">
            <v-col cols="3" class="mt-10">
                <v-sheet
                rounded="lg"
                >
                    <v-container fluid>
                        <v-row align="center" justify="center">
                            <v-col cols="12" md="12" sm="3" class="rounded-t-lg" style="background-color:#FFF9C4;">
                                <!-- <v-sheet rounded="lg"> -->
                                    <v-container fluid class="text-center">
                                        <!-- <Blink> -->
                                            <img
                                            elevation="20"
                                            src="K3.png"
                                            height="120"
                                            >
                                            <br>
                                            <strong style="font-size:14px; color:#43A047;">UTAMAKAN</strong><br>
                                            <!-- <strong style="font-size:14px; color:#43A047;">UTAMAKAN</strong><br> -->
                                            <strong style="font-size:14px; color:#43A047;">KESELAMATAN & KESEHATAN KERJA</strong>
                                        <!-- </Blink> -->
                                    </v-container>
                                <!-- </v-sheet> -->
                            </v-col>
                            <v-col cols="12" md="12" sm="3" style="background-color:#FFEE58;">
                                <!-- <v-sheet rounded="lg"> -->
                                    <v-container fluid class="text-center">
                                        <img
                                        src="helpro.png"
                                        height="520"
                                        class="blink"
                                        >
                                    </v-container>
                                <!-- </v-sheet> -->
                            </v-col>
                            <v-col cols="12" md="12" sm="3" class="text-center rounded-b-lg" style="color:white; background-color:black;">
                                <h2 class="text-h4">{{dateTanggal.tanggal}} {{dateTanggal.bulan}} {{dateTanggal.tahun}}</h2>
                                <h2 class="text-h5">{{dateTime.hours}}:{{ dateTime.minutes }}:{{ dateTime.seconds }}</h2>
                                <!-- <v-btn icon color="teal"><v-icon x-large>mdi-home</v-icon></v-btn> -->
                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
            </v-col>
            <v-col cols="5" >
                <v-row align="center" justify="center">
                    <v-col cols="6">
                            <img
                            elevation="20"
                            src="inl.png"
                            height="40"
                            class="mr-4"
                            >
                        <!-- <v-container fluid>
                        </v-container> -->
                    </v-col>
                    <v-col cols="6" class="text-right">
                            <img
                            elevation="20"
                            src="bumn.png"
                            height="30"
                            >
                        <!-- <v-container fluid>
                        </v-container> -->
                    </v-col>
                    <v-col cols="12">
                        <v-sheet
                        rounded="lg"
                        >
                            <v-container fluid class="text-center">
                                <h3 class="mb-3 text-h5">INFORMASI KESELAMATAN KERJA</h3>
                                <v-row class="text-left">
                                    <v-col cols="6">
                                        <v-sheet
                                        rounded="lg"
                                        color="teal darken-4"
                                        dark
                                        >
                                            <v-container fluid>
                                                <v-row align="center">
                                                    <v-col cols="2">
                                                        <v-icon large>mdi-clipboard-text-clock</v-icon>
                                                    </v-col>
                                                    <v-col cols="7" style="font-size:14px;">
                                                        <span>TOTAL WORKING DAYS</span><br>
                                                        <v-divider></v-divider>
                                                        <span>Jumlah Hari Kerja</span>
                                                    </v-col>
                                                    <v-col cols="3" class="text-right">
                                                        <strong class="text-h5">{{performance.work_days}}</strong>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-sheet>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-sheet
                                        rounded="lg"
                                        color="cyan darken-3"
                                        dark
                                        >
                                            <v-container fluid>
                                                <v-row align="center">
                                                    <v-col cols="2">
                                                        <v-icon large>mdi-medical-bag</v-icon>
                                                    </v-col>
                                                    <v-col cols="7" style="font-size:14px;">
                                                        <span>TOTAL SAFE WORKED DAYS</span><br>
                                                        <v-divider dark></v-divider>
                                                        <span>Jumlah Hari Kerja Selamat</span>
                                                    </v-col>
                                                    <v-col cols="3" class="text-right">
                                                        <strong class="text-h5">{{performance.safe_work}}</strong>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-sheet>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-sheet
                                        rounded="lg"
                                        color="orange darken-3"
                                        dark
                                        >
                                            <v-container fluid>
                                                <v-row align="center">
                                                    <v-col cols="1">
                                                        <v-icon large>mdi-briefcase-clock</v-icon>
                                                    </v-col>
                                                    <v-col cols="8" style="font-size:14px;">
                                                        <span>TOTAL MANHOURS WORKED WITHOUT LOSE ACCIDENT</span><br>
                                                        <v-divider></v-divider>
                                                        <span>Total Jam Kerja Tanpa Kecelakaan</span>
                                                    </v-col>
                                                    <v-col cols="3" class="text-right">
                                                        <strong class="text-h5">{{performance.manhours_worked}}</strong>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-sheet>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-sheet
                                        rounded="lg"
                                        color="red darken-4"
                                        dark
                                        >
                                            <v-container fluid>
                                                <v-row align="center" justify="center" class="mb-2">
                                                    <v-col cols="2" class="text-center">
                                                        <v-icon class="text-h1">mdi-skull</v-icon>
                                                    </v-col>
                                                    <v-col cols="10" class="text-right">
                                                        <span>LAST ACCIDENT</span><br>
                                                        <v-divider></v-divider>
                                                        <span>Kecelakaan Terakhir</span>
                                                        <v-system-bar height="2" color="white"></v-system-bar>
                                                        <v-row align="center" justify="center" class="mt-2">
                                                            <v-col cols="6" class="text-left">
                                                                <span class="text-h7">{{last_acident.jml}} Orang</span>
                                                            </v-col>
                                                            <v-col cols="6">
                                                                <span class="text-h7">{{last_acident.tgl}}</span>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                <span style="font-size:13px; color:#ECEFF1;"><v-icon left>mdi-message-text</v-icon> {{last_acident.ket}}</span>
                                            </v-container>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-sheet>
                    </v-col>
                    <v-col cols="12">
                        <v-sheet
                        rounded="lg"
                        >
                            <v-container fluid>
                                <v-carousel hide-delimiters show-arrows-on-hover cycle height="420">
                                    <v-carousel-item
                                    v-for="(item) in items"
                                    :key="item.urutan"
                                    :src="item.src"
                                    reverse-transition="fade-transition"
                                    ></v-carousel-item>
                                </v-carousel>
                            </v-container>
                        </v-sheet>
                    </v-col>
                    <!-- <v-col cols="12" md="12" sm="3">
                        <v-sheet
                        rounded="lg"
                        >
                            <v-container fluid>
                                <div class="text-center">
                                    <strong>WORK PROGRAM HSE & P2K3L MONTHLY</strong>
                                </div>
                                <v-simple-table 
                                dense
                                fixed-header
                                height="400px">
                                    <thead class="text-center">
                                        <tr>
                                            <th rowspan="2">No</th>
                                            <th rowspan="2">Description of Activity</th>
                                            <th rowspan="2">Action By</th>
                                            <th rowspan="2">Time</th>
                                            <th>Thurs</th>
                                            <th>Thurs</th>
                                            <th>Fri</th>
                                            <th>Thurs</th>
                                            <th>Wed</th>
                                            <th>Thurs</th>
                                            <th rowspan="2">Remarks</th>
                                        </tr>
                                        <tr>
                                            <th>7</th>
                                            <th>14</th>
                                            <th>11</th>
                                            <th>21</th>
                                            <th>27</th>
                                            <th>28</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style="font-size:11px;">1</td>
                                            <td style="font-size:11px;">Safety Patrol & Gemba / P2K3L</td>
                                            <td style="font-size:11px;">HSE & All Department</td>
                                            <td style="font-size:11px;">08.15 WIB in Area</td>
                                            <td style="font-size:11px;">Warehouse sparepart & Boiler</td>
                                            <td style="font-size:11px;">Packaging</td>
                                            <td style="font-size:11px;">-</td>
                                            <td style="font-size:11px;">Refenery Fractionation</td>
                                            <td style="font-size:11px;">-</td>
                                            <td style="font-size:11px;">Belakang Packaging</td>
                                            <td style="font-size:11px;">Dilakukan 1x Seminggu</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Safety Behavior Observasi, Fire Fighting Awareness</td>
                                            <td>All Department</td>
                                            <td>07.00 WIB s/d 21.00 WIB in Area</td>
                                            <td>All</td>
                                            <td>All</td>
                                            <td>All</td>
                                            <td>All</td>
                                            <td>All</td>
                                            <td>All</td>
                                            <td>Dilakukan 1x Seminggu</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Meeting P2K3L</td>
                                            <td>Member P2K3L</td>
                                            <td>15.00 WIB in Area</td>
                                            <td>All</td>
                                            <td>All</td>
                                            <td>All</td>
                                            <td>All</td>
                                            <td>All</td>
                                            <td>All</td>
                                            <td>Dilakukan 1x Seminggu</td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </v-container>
                        </v-sheet>
                    </v-col> -->
                </v-row>
            </v-col>
            <v-col cols="4" class="text-center mt-10">
                <v-sheet
                rounded="lg"
                >
                    <v-container fluid>
                        <strong class="text-h5 mb-4">Work Program Monthly</strong>
                        <h3 class="text-h5 mb-4"><strong>HSE & P2K3L</strong></h3>
                        <v-row>
                            <v-col cols="12" class="text-center"
                            v-for="(program,i) in programs"
                            :key="i">
                                <v-card
                                :color=" i==0 ? 'pink darken-3': 'blue darken-3'"
                                dark
                                >
                                    <v-card-title class="text-h5">{{program.aktifitas}}</v-card-title>
                                    <v-card-subtitle class="text-left">
                                        <v-row align="center">
                                            <v-col cols="5">
                                                <v-icon small left>mdi-google-maps</v-icon> {{program.area}}
                                            </v-col>
                                            <v-col cols="7">
                                                <v-icon small left>mdi-calendar-clock</v-icon> {{program.tanggal}} <span class="ml-1 mr-1">|</span> {{program.time}}
                                            </v-col>
                                        </v-row>
                                    </v-card-subtitle>
                                    <v-card-text style="color:white;">
                                        Participant: <strong>{{program.pelaksana}}</strong>
                                    </v-card-text>
                                </v-card>
                                <v-icon class="mt-3" large v-show="i != Number(programs.length)-1">mdi-arrow-down-bold</v-icon>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
            </v-col>
            <v-col cols="12" class="text-center">
                <span style="font-size:14px; color:#00796B;">Health, Security & Environment</span> <br>
                <span style="font-size:11px;"><strong style="font-style: italic;">PT. Industri Nabati Lestari</strong> - Copyright &copy; IT.INL 2022</span>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
// import { Bar } from 'vue-chartjs/legacy';
// import Blink from 'vue-blink';
import DashService from '@/api/api_dash';
import moment from 'moment';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const date = new Date();
export default {
    name: 'BarChart',
    components: { 
        // Bar
    },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 225
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => {}
        },
        plugins: {
            type: Object,
            default: () => {}
        },
    },
    data() {
        return {
            dateTanggal: {
                tahun: moment(new Date).format("YYYY"),
                bulan: moment(new Date).format("MMM"),
                tanggal: moment(new Date).format("DD"),
            },
            dateTime: {
                hours: moment(date).format("HH"),
                minutes: moment(date).format("mm"),
                seconds: moment(date).format("ss"),
            },
            timer: undefined,
            chartData: {
                labels: [ 'January', 'February', 'March' ],
                datasets: [ 
                    {
                        label:'Jumlah Hari Kerja',
                        backgroundColor: '#00695C',
                        data: [40, 20, 12] 
                    },
                    {
                        label:'Jumlah Jam Kerja Tanpa Kecelakaan',
                        backgroundColor: '#689F38',
                        data: [30, 52, 25] 
                    },
                    {
                        label:'Jumlah Jam Kerja Selamat',
                        backgroundColor: '#039BE5',
                        data: [11, 33, 50] 
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    subtitle: {
                        display: true,
                        text: 'HSE Performance Board'
                    },
                    title: {
                        display: true,
                        text: 'INFORMASI KESELAMATAN KERJA'
                    },
                }
            },
            items: [],
            programs:[],
            performance:{
                work_days:300,
                safe_work:300,
                manhours_worked:0
            },
            last_acident:{
                tgl:moment(new Date).format('YYYY-MM-DD'),
                jml:'0',
                ket:'',
            },
        }
    },
    methods:{
        loadGambar(){
            // const data = [];
            DashService.getAllSlide().then(res => {
                if (res.data.code == 200) {
                    const datas = res.data.slides2;
                    // console.log(datas);
                    const list = [];
                    for (let i = 0; i < datas.length; i++) {
                        list[i] = {
                            src: datas[i].gambar,
                            urutan: datas[i].urutan,
                            status: datas[i].status,
                        };
                    }
                    this.items = list;
                } else {
                    console.log('tidak ada data!');
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        workProgram(){
            DashService.getAllPrograms().then(res => {
                if (res.data.code == 200) {
                    const datas = res.data.data;
                    // console.log(datas);
                    const list = [];
                    var waktu;
                    for (let i = 0; i < datas.length; i++) {
                        if (datas[i].jam_selesai == '' || datas[i].jam_selesai == null) {
                            
                            waktu = moment(datas[i].jam_mulai,'hh:mm').format('hh:mm')+' WIB';
                        } else {
                            waktu = moment(datas[i].jam_mulai,'hh:mm').format('hh:mm')+' s/d '+ moment(datas[i].jam_selesai,'hh:mm').format('hh:mm')+' WIB';
                        }
                        list[i] = {
                            tanggal: moment(datas[i].tanggal).format('dddd, DD-MM-YYYY'),
                            area: datas[i].area,
                            aktifitas: datas[i].aktifitas,
                            pelaksana: datas[i].pelaksana,
                            time: waktu,
                        };
                    }
                    this.programs = list;
                    console.log(this.programs);
                } else {
                    console.log('tidak ada data!');
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        setDateTime() {
            const date = new Date();
            this.dateTanggal = {
                tahun: moment(new Date).format("YYYY"),
                bulan: moment(new Date).format("MMM"),
                tanggal: moment(new Date).format("DD"),
            }
            this.dateTime = {
                hours: moment(date).format("HH"),
                minutes: moment(date).format("mm"),
                seconds: moment(date).format("ss"),
            };
        },
        loadPerformance(){
            const start = new Date(moment('01/01/'+new Date().getFullYear()).format('DD/MM/YYYY'));
            const end = new Date();
            const diff = (end - start)/1000;
            const total = Math.floor(diff/(86400));
            this.performance.work_days = total+1;
            // this.performance.safe_work = total+1;
            // this.performance.manhours_worked = (total*24)+(end.getHours()-start.getHours());
            // console.log((total*24)+(end.getHours()-start.getHours()));
        },
        loadAccident(){
            DashService.getAccident().then((res) => {
                if (res.data.code == 200) {
                    const datas = res.data.data;
                    this.last_acident.jml = datas[0].jumlah_korban;
                    this.last_acident.ket = datas[0].keterangan_accident;
                    this.last_acident.tgl = moment(datas[0].tgl_accident).format('YYYY-MM-DD');
                } else {
                    this.last_acident.jml = '0';
                    this.last_acident.ket = '';
                    this.last_acident.tgl = '';
                }
            }).catch((err) => {
                console.log(err);
                this.last_acident.jml = '?';
                this.last_acident.ket = '?';
                this.last_acident.tgl = '';
            });
        },
        loadSafe(){
            const jenis = 'safe';
            DashService.getTotal(jenis).then((res) => {
                if (res.data.code == 200) {
                    const datas = res.data.data;
                    this.performance.safe_work = datas.jumlah_total;
                } else {
                    this.performance.safe_work = '0';
                }
            }).catch((err) => {
                console.log(err);
                this.performance.safe_work = '?';
            });
        },
        loadManhours(){
            const jenis = 'manhours';
            DashService.getTotal(jenis).then((res) => {
                if (res.data.code == 200) {
                    const datas = res.data.data;
                    this.performance.manhours_worked = datas.jumlah_total;
                } else {
                    this.performance.manhours_worked = '0';
                }
            }).catch((err) => {
                console.log(err);
                this.performance.manhours_worked = '?';
            });
        },
        loadLastAccident(){

        }
    },
    created(){
        this.loadGambar()
        this.workProgram()
        this.loadPerformance()
        this.loadSafe()
        this.loadManhours()
        this.loadAccident()
    },
    beforeMount() {
        this.timer = setInterval(this.setDateTime, 1000);
    },
    beforeUnmount() {
        clearInterval(this.timer);
    },
}
</script>