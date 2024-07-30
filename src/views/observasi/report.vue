<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <h3 class="text-h5"><v-icon left>mdi-alarm-light</v-icon> Report Observation</h3>
            </v-col>
            <v-col cols="12">
                <v-card rounded="lg">
                    <v-container fluid>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="3" md="8">
                                <h3 class="text-h6"><v-icon left>mdi-table</v-icon> Laporan Observasi</h3>
                            </v-col>
                            <v-col cols="12" sm="3" md="4">
                                <v-text-field
                                    label="Search..."
                                    prepend-inner-icon="mdi-magnify"
                                    v-model="search"
                                    dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-2 mb-2"></v-divider>
                        <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :search="search"
                            class="mt-2"
                            dense
                        >
                            <template v-slot:[`item.status`]="{item}">
                                <strong style="color:#9E9D24" v-if="item.status == 'Open'">{{item.status}}</strong>
                                <strong style="color:#EF6C00" v-else-if="item.status == 'On Progress'">{{item.status}}</strong>
                                <strong style="color:#009688" v-else-if="item.status == 'Done'">{{item.status}}</strong>
                                <strong style="color:#795548" v-else-if="item.status == 'Batal'">{{item.status}}</strong>
                                <strong style="color:#C62828" v-else>{{item.status}}</strong>
                            </template>
                            <template v-slot:[`item.actions`]="{item}">
                                <v-menu
                                bottom
                                origin="center center"
                                transition="scale-transition"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        color="primary"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        small
                                        outlined
                                        >Aksi <v-icon right>mdi-menu-down</v-icon></v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item link @click="detailsItem(item)">
                                            <v-list-item-subtitle style="color:#2196F3;"><v-icon color="blue" small left>mdi-file-find</v-icon> Details</v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item link @click="executeItem(item)" v-show="item.status == 'Open'">
                                            <v-list-item-subtitle style="color:#43A047;"><v-icon color="green darken-1" small left>mdi-run-fast</v-icon> Execute</v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item link @click="updateItem(item)" v-show="item.status == 'On Progress'">
                                            <v-list-item-subtitle style="color:#F57F17;"><v-icon color="yellow darken-4" small left>mdi-run-fast</v-icon> Update Progress</v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item link @click="doneItem(item)" v-show="item.status == 'On Progress'">
                                            <v-list-item-subtitle style="color:#43A047;"><v-icon color="green darken-1" small left>mdi-check</v-icon> Done</v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item link @click="deleteItem(item)" v-show="item.status == 'Open'">
                                            <v-list-item-subtitle style="color:#AD1457;"><v-icon color="pink darken-3" small left>mdi-close</v-icon> Reject</v-list-item-subtitle>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>


        <!-- Form Input Dialog -->
        <v-row justify="center">
            <v-dialog v-model="dialog" max-width="800px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{titles}}</span> 
                        <v-spacer></v-spacer>
                        <v-btn small icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text class="mt-3">
                        <v-container>
                            <strong v-show="required !=''" style="color:red;">{{required}}</strong>
                            <v-row>
                                <v-col cols="6">
                                    <v-menu
                                    v-model="menus"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                            v-model="formInput.tanggal"
                                            label="Tanggal"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="formInput.tanggal"
                                        @input="menus = false"
                                        color="cyan"
                                        :max="today"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                    v-model="formInput.jam"
                                    prepend-inner-icon="mdi-clock"
                                    label="Jam"
                                    type="time"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                    v-model="formInput.observasi"
                                    :items="list_observasi"
                                    prepend-inner-icon="mdi-cloud-search"
                                    label="Kategori Observasi"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                    v-model="formInput.lokasi"
                                    prepend-inner-icon="mdi-google-maps"
                                    label="Lokasi"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-file-input
                                    show-size
                                    counter
                                    multiple
                                    v-model="formInput.file"
                                    accept="image/*"
                                    prepend-icon="mdi-camera-image"
                                    hint="Format image"
                                    label="Gambar"
                                    ></v-file-input>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                    label="Keterangan Observasi"
                                    auto-grow
                                    rows="3"
                                    prepend-inner-icon="mdi-format-list-text"
                                    v-model="formInput.keterangan"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" small text @click="submit" class="mr-2"><v-icon left>mdi-content-save</v-icon> Save</v-btn>
                        <v-btn color="yellow darken-3" small text @click="reset"><v-icon left>mdi-reload</v-icon> Reset</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <!-- Delete Form Dialog -->
        <v-row justify="center">
            <v-dialog v-model="dialog1" max-width="650px">
                <v-card>
                    <v-card-title style="background-color:#AD1457; color:white;">
                        <span class="text-h5">{{titles}}</span>
                    </v-card-title>
                    <v-card-text class="mt-3">
                        <v-container v-show="typeSubmit == 'delete'">
                            <span>{{statment}} ?</span>
                            <p style="color:red; font-size:12px;">*Wajib diisi</p>
                            <v-textarea
                            label="Keterangan Reject"
                            auto-grow
                            rows="3"
                            prepend-inner-icon="mdi-format-list-text"
                            v-model="formInput.keterangan"
                            ></v-textarea>
                        </v-container>
                        <v-container v-show="typeSubmit == 'execute'">
                            <span>{{statment}} ?</span>
                        </v-container>
                        <v-container v-show="typeSubmit == 'done'">
                            <span>{{statment}} ?</span>
                        </v-container>
                        <v-container v-show="typeSubmit == 'edit'">
                            <p style="color:red; font-size:12px;">*Harap diisi update progress</p>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                    v-model="formInput.pic"
                                    prepend-inner-icon="mdi-account"
                                    label="PIC"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                    v-model="formInput.divisi"
                                    prepend-inner-icon="mdi-home-account"
                                    label="Divisi"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-textarea
                            label="Keterangan Progress"
                            auto-grow
                            rows="3"
                            prepend-inner-icon="mdi-format-list-text"
                            v-model="formInput.keterangan"
                            ></v-textarea>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="pink darken-1" @click="submit">Yes</v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog1 = false"
                        >No</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <!-- Form Input Details -->
        <v-row justify="center">
            <v-dialog v-model="dialog2" max-width="1000px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{titles}}</span> 
                        <v-spacer></v-spacer>
                        <v-btn small icon @click="dialog2 = false"><v-icon>mdi-close</v-icon></v-btn>
                    </v-card-title>
                    <v-divider class="my-2"></v-divider>
                    <v-card-text class="mt-3">
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col cols="2"><strong><v-icon>mdi-calendar-clock</v-icon></strong></v-col>
                                        <v-col cols="10">{{details.tanggal}} <span class="ml-3">{{details.jam}} WIB</span></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="2"><strong><v-icon>mdi-google-maps</v-icon></strong></v-col>
                                        <v-col cols="10">{{details.lokasi}}</v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col cols="4"><strong>Keterangan</strong></v-col>
                                        <v-col cols="8">{{details.keterangan}}</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4"><strong>Progress</strong></v-col>
                                        <v-col cols="8"><v-btn x-small color="cyan" dark>View</v-btn></v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12">

                                </v-col>
                                <v-col cols="12">
                                    <strong>Capture:</strong> <br>
                                    <v-row class="mt-2">
                                        <v-col 
                                        cols="4"
                                        class="mr-2"
                                        v-for="(item) in details.file"
                                        :key="item.src">
                                            <img
                                                elevation="20"
                                                :src="item.src"
                                                height="180"
                                                >
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" class="text-center">
                                    <span class="">PELAPOR</span><br>
                                    <strong>{{details.user}}</strong>
                                </v-col>
                                <v-col cols="4" class="text-center" v-show="details.eksekutor != ''">
                                    <span class="">PENANGGUNGJAWAB</span><br>
                                    <strong>{{details.eksekutor}}</strong><br>
                                    <span>HSSE</span>
                                </v-col>
                                <v-col cols="4" class="text-center" v-show="details.pic != '-'">
                                    <span class="">PIC</span><br>
                                    <strong>{{details.pic}}</strong><br>
                                    <span>{{details.divisi}}</span>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>

        <!-- Notifikasi -->
        <v-row justify="center">
            <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            top
            right
            :color="Messages.color"
            outlined
            absolute
            > <v-icon :color="Messages.color" left small>{{Messages.icon}}</v-icon> {{Messages.statment}}
                <template v-slot:action="{ attrs }">
                    <v-btn
                    text
                    fab
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    <v-icon small>fas fa-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
        </v-row>
    </v-container>
</template>

<script>
// Moment
import moment from 'moment';

// API Axios
import ObservationService from '@/api/api_observasi';

export default {
    data: () => ({
            user: JSON.parse(localStorage.user),
            
            // DataTable
            headers:[],
            desserts:[],
            search:'',

            // Form Input
            formInput:{
                id:'',
                tanggal:moment(new Date).format('YYYY-MM-DD'),
                jam:moment(new Date).format('HH:mm:ss'),
                observasi:'',
                lokasi:'',
                pic:'',
                divisi:'',
                file:[],
                keterangan:'',
            },
            details:{
                id:'',
                tanggal:'',
                jam:'',
                lokasi:'',
                user:'',
                pic:'',
                divisi:'',
                status:'',
                eksekutor:'',
                keterangan:'',
                file:[]
            },
            list_observasi:[],
            menus:false,
            dialog:false,
            dialog1:false,
            dialog2:false,
            titles:'',
            required:'',
            typeSubmit:'',
            statment:'',
            today:moment(new Date).format('YYYY-MM-DD'),

            // Notifikasi
            Messages:{
                icon:'',
                statment:'',
                color:''
            },
            snackbar: false,
            timeout: 3000,
        }),
        methods:{
            dataTable(){
                this.headers = [
                    {text:'ID',value:'id'},
                    {text:'Tanggal', value:'tgl'},
                    {text:'Observation', value:'list'},
                    {text:'Jam', value:'jam'},
                    {text:'Status', value:'status'},
                    {text:'#', align:'center', value:'actions'}
                ];
                ObservationService.getAllObservation().then((res) => {
                    const load = [];
                    if (res.data.code == 200) {
                        const datas = res.data.semua;
                        for (let i = 0; i < datas.length; i++) {
                            load[i] = {
                                id: datas[i].no_tiket,
                                list: datas[i].nama_categories,
                                tgl: moment(datas[i].tgl_observations).format('YYYY-MM-DD'),
                                jam: datas[i].jam_observations,
                                status: datas[i].info_observations
                            }
                        }
                    } else {
                        load[0] = {
                            id: null,
                            list: null,
                        }
                    }
                    this.desserts = load;
                }).catch((err) => {
                    console.log(err);
                });
            },
            doneItem(item){
                this.typeSubmit = 'done';
                this.dialog1 = true;
                this.statment = 'Apakah anda sudah menyelesaikan temuan observasi ID '+item.id;
                this.titles = 'Eksekusi Observasi';
                this.formInput.keterangan = 'Problem pada temuan sudah diselesaikan';
                this.formInput.id = item.id;
            },
            updateItem(item){
                this.typeSubmit = 'edit';
                this.dialog1 = true;
                this.titles = 'Update Progress Observasi';
                this.formInput.id = item.id;
                this.formInput.keterangan = '';
                this.formInput.pic = '';
                this.formInput.divisi = '';
            },
            executeItem(item){
                this.typeSubmit = 'execute';
                this.dialog1 = true;
                this.titles = 'Eksekusi Observasi';
                this.details.status = item.status;
                this.formInput.id = item.id;
                this.formInput.keterangan = 'Sedang dalam proses survey'
                this.statment = 'Apakah anda ingin melakukan eksekusi';
            },
            detailsItem(item){
                this.dialog2 = true;
                this.titles = "Detail Data - "+item.id;
                ObservationService.getObservationByID(item.id).then((res) => {
                    if (res.data.code == 200) {
                        const datas = res.data.mengajukan;
                        const data2 = res.data.log;
                        let pelaku;
                        if (data2 == null) {
                            pelaku = '';
                        } else {
                            pelaku = data2.nama_user;
                        }
                        this.details = {
                            id: datas.no_tiket,
                            tanggal: moment(datas.tgl_observations).format('YYYY-MM-DD'),
                            jam: datas.jam_observations,
                            lokasi: datas.lokasi,
                            user: datas.nama_user,
                            pic: datas.pic,
                            eksekutor: pelaku,
                            divisi:datas.divisi,
                            keterangan: datas.keterangan_observations,
                        }
                        const foto = datas.foto_observations;
                        const load = [];
                        for (let i = 0; i < foto.length; i++) {
                            load[i] = {
                                src: foto[i]
                            };
                        }
                        this.details.file = load;
                        console.log(this.details.file);
                    } else {
                        this.dialog2 = false;
                        this.snackbar = true;
                        this.Messages.color = 'warning';
                        this.Messages.icon = 'fas fa-exclamation-triangle';
                        this.Messages.statment = 'Proses gagal !';
                    }
                }).catch((err) => {
                    console.log(err);
                    this.snackbar = true;
                    this.Messages.color = 'error';
                    this.Messages.icon = 'fas fa-info';
                    this.Messages.statment = 'Terjadi kesalahan sistem, silahkan hubungi tim IT !';
                });
            },
            reset(){
                this.formInput = {
                    observasi:'',
                    keterangan:'',
                };
            },
            submit(){
                if (this.typeSubmit == 'execute') {
                    const data =  {
                        keterangan_observations: this.formInput.keterangan,
                    }
                    ObservationService.onprogressObservation(data,this.formInput.id).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Update data sukses, Selamat Bekerja !';
                        } else {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'warning';
                            this.Messages.icon = 'fas fa-exclamation-triangle';
                            this.Messages.statment = 'Proses gagal !';
                        }
                        this.dialog1 = false;
                    }).catch((err) => {
                        console.log(err);
                        this.snackbar = true;
                        this.Messages.color = 'error';
                        this.Messages.icon = 'fas fa-info';
                        this.Messages.statment = 'Terjadi kesalahan sistem, silahkan hubungi tim IT !';
                        this.dialog1 = false;
                    });
                } else if (this.typeSubmit == 'edit') {
                    const data =  {
                        pic: this.formInput.pic,
                        divisi: this.formInput.divisi,
                        keterangan_observations: this.formInput.keterangan,
                    }
                    ObservationService.updateProgressObservation(data,this.formInput.id).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Update data sukses !';
                        } else {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'warning';
                            this.Messages.icon = 'fas fa-exclamation-triangle';
                            this.Messages.statment = 'Proses gagal !';
                        }
                        this.dialog1 = false;
                    }).catch((err) => {
                        console.log(err);
                        this.snackbar = true;
                        this.Messages.color = 'error';
                        this.Messages.icon = 'fas fa-info';
                        this.Messages.statment = 'Terjadi kesalahan sistem, silahkan hubungi tim IT !';
                        this.dialog1 = false;
                    });
                    // console.log(data);
                } else {
                    const data =  {
                        keterangan_observations: this.formInput.keterangan,
                    }
                    ObservationService.doneObservation(data,this.formInput.id).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Progress Selesai !';
                        } else {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'warning';
                            this.Messages.icon = 'fas fa-exclamation-triangle';
                            this.Messages.statment = 'Proses gagal !';
                        }
                        this.dialog1 = false;
                    }).catch((err) => {
                        console.log(err);
                        this.snackbar = true;
                        this.Messages.color = 'error';
                        this.Messages.icon = 'fas fa-info';
                        this.Messages.statment = 'Terjadi kesalahan sistem, silahkan hubungi tim IT !';
                        this.dialog1 = false;
                    });
                }
            },
            link(test){
                this.$router.push(test);
            },
        },
        created(){
            this.dataTable();
        }
}
</script>