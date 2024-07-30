<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <h3 class="text-h5"><v-icon left>mdi-alert</v-icon> My Observation</h3>
            </v-col>
            <v-col cols="12">
                <v-card rounded="lg">
                    <v-container fluid>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="3" md="6">
                                <h3 class="text-h6"><v-icon left>mdi-table</v-icon> Tabel Observasi</h3>
                            </v-col>
                            <v-col cols="12" sm="3" md="2" class="text-right">
                                <v-btn small color="primary" fab @click="addItem">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
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
                                <strong style="color:#0277BD" v-else-if="item.status == 'On Progress'">{{item.status}}</strong>
                                <strong style="color:#009688" v-else-if="item.status == 'Done'">{{item.status}}</strong>
                                <strong style="color:#795548" v-else-if="item.status == 'Batal'">{{item.status}}</strong>
                                <strong style="color:#C62828" v-else>{{item.status}}</strong>
                            </template>
                            <template v-slot:[`item.actions`]="{item}">
                                <v-btn x-small fab text @click="detailsItem(item)" color="cyan"><v-icon>mdi-file-find</v-icon></v-btn>
                                <v-btn x-small fab text @click="deleteItem(item)" color="red" v-show="item.status == 'Open'"><v-icon>mdi-close</v-icon></v-btn>
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
                            <v-row align="center">
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
                                    @input="loadKategoriByName"
                                    prepend-inner-icon="mdi-cloud-search"
                                    label="Kategori Observasi"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-textarea
                                    label="Detail Kategori"
                                    auto-grow
                                    readonly
                                    filled
                                    rounded
                                    v-model="detail_observation"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-autocomplete
                                    v-model="formInput.lokasi"
                                    prepend-inner-icon="mdi-google-maps"
                                    label="Lokasi"
                                    :items="list_lokasi"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12">
                                    <v-file-input
                                    type="file"
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

        <!-- Form Input Details -->
        <v-row justify="center">
            <v-dialog v-model="dialog2" max-width="1000px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{titles}}</span> 
                        <v-spacer></v-spacer>
                        <v-btn small icon @click="dialog2 = false"><v-icon>mdi-close</v-icon></v-btn>
                    </v-card-title>
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
                                        <v-col cols="4"><strong>Status</strong></v-col>
                                        <v-col cols="8">: {{details.status}}</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4"><strong>Keterangan</strong></v-col>
                                        <v-col cols="8">: {{details.keterangan}}</v-col>
                                    </v-row>
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

        <!-- Delete Form Dialog -->
        <v-row justify="center">
            <v-dialog v-model="dialog1" max-width="400px">
                <v-card>
                    <v-card-title style="background-color:#AD1457; color:white;">
                        <span class="text-h5">{{titles}}</span>
                    </v-card-title>
                    <v-card-text class="mt-3">
                        <v-container>
                            <span>Apakah anda ingin membatalkan temuan observasi ID <strong>{{statment}}</strong> ?</span>
                            <v-textarea
                            label="Keterangan Observasi"
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
            list_lokasi:[],
            detail_observation:'',
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
                    {text:'Status', align:'center', value:'status'},
                    {text:'#', align:'center', value:'actions'}
                ];
                ObservationService.getMyObservation().then((res) => {
                    const load = [];
                    if (res.data.code == 200) {
                        const datas = res.data.mengajukan;
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
            addItem(){
                this.typeSubmit = 'add';
                this.dialog = true;
                this.titles = 'Tambah Observasi';
                this.loadKategori();
                this.loadLokasi();
                this.formInput = {
                    id:'',
                    tanggal:moment(new Date).format('YYYY-MM-DD'),
                    jam:moment(new Date).format('HH:mm:ss'),
                    observasi:'',
                    lokasi:'',
                    file:[],
                    keterangan:'',
                };
            },
            editItem(){
                this.typeSubmit = 'edit';
                this.dialog = true;
                this.titles = 'Edit Observasi';
                this.loadKategori();
                this.loadLokasi();
            },
            deleteItem(item){
                this.typeSubmit = 'delete';
                this.dialog1 = true;
                this.titles = 'Reject Observasi';
                this.statment = item.id;
                this.formInput.id = item.id;
                this.formInput.keterangan = '';
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
                            status: datas.info_observations,
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
                this.typeSubmit == 'add'
                if (this.typeSubmit == 'add') {
                    let formData = new FormData();
                    for (let i = 0; i < this.formInput.file.length; i++) {
                        formData.append('foto_observations['+i+']', this.formInput.file[i]);
                    }
                    formData.append('kategori_id', this.formInput.observasi);
                    formData.append('jam_observations', this.formInput.jam);
                    formData.append('tgl_observations', this.formInput.tanggal);
                    formData.append('lokasi_id', this.formInput.lokasi);
                    formData.append('user_id', this.user.id);
                    formData.append('keterangan_observations', this.formInput.keterangan);
                    ObservationService.PostObservation(formData).then((res) => {
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
                        this.dialog = false;
                    }).catch((err) => {
                        console.log(err);
                        this.snackbar = true;
                        this.Messages.color = 'error';
                        this.Messages.icon = 'fas fa-info';
                        this.Messages.statment = 'Terjadi kesalahan sistem, silahkan hubungi tim IT !';
                        this.dialog = false;
                    });
                    this.dialog = false;
                } else if (this.typeSubmit == 'edit') {
                    const data =  {
                        id: this.formInput.id,
                        nama: this.formInput.observasi,
                        keterangan: this.formInput.keterangan,
                    }
                    console.log(data);
                } else  {
                    const data =  {
                        keterangan_observations: this.formInput.keterangan,
                    }
                    ObservationService.rejectObservation(data,this.formInput.id).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Pembatalan data sukses !';
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
                        this.dialog = false;
                    });
                    this.dialog1 = false;
                    // console.log(data);
                }
            },
            link(test){
                this.$router.push(test);
            },

            // Load Data
            loadKategori(){
                ObservationService.getAllCategories().then((res) => {
                    const load = [];
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        for (let i = 0; i < datas.length; i++) {
                            load[i] = {
                                value: datas[i].id,
                                text: datas[i].nama_categories,
                            }
                        }
                    } else {
                        load[0] = {
                            id: null,
                            list: null,
                        }
                    }
                    this.list_observasi = load;
                }).catch((err) => {
                    console.log(err);
                });
            },
            loadKategoriByName(){
                ObservationService.getCategoriesById(this.formInput.observasi).then((res) => {
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        this.detail_observation = datas.keterangan_categories;
                    } else {
                        this.required = 'Tidak Ditemukan';
                    }
                }).catch((err) => {
                    console.log(err);
                        this.required = 'Load Data Error';
                });
            },
            loadLokasi(){
                ObservationService.getAllLocation().then((res) => {
                    const load = [];
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        for (let i = 0; i < datas.length; i++) {
                            load[i] = {
                                value: datas[i].id,
                                text: datas[i].nama_locations,
                            }
                        }
                    } else {
                        load[0] = {
                            id: null,
                            list: null,
                        }
                    }
                    this.list_lokasi = load;
                }).catch((err) => {
                    console.log(err);
                });
            },
        },
        created(){
            this.dataTable();
        }
}
</script>