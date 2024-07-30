<template>
    <v-container fluid>
        <v-card rounded="lg">
            <v-container fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="3" md="6">
                        <h3 class="text-h6"><v-icon left>mdi-table</v-icon> Table Activity</h3>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" class="text-right">
                        <v-btn small color="primary" fab @click="AddAktivitas">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
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
                                <v-list-item link @click="editItem(item)">
                                    <v-list-item-subtitle style="color:#F57F17;"><v-icon color="yellow darken-4" small left>mdi-pencil</v-icon> Edit</v-list-item-subtitle>
                                </v-list-item>
                                <v-list-item link @click="deleteItem(item)">
                                    <v-list-item-subtitle style="color:#AD1457;"><v-icon color="pink darken-3" small left>mdi-delete</v-icon> Delete</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                </v-data-table>
            </v-container>
        </v-card>

        <!-- Tambah Data Banding Dialog -->
        <v-row justify="center">
            <v-dialog v-model="dialog1" max-width="1100px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{titles}}</span> 
                        <v-spacer></v-spacer>
                        <v-btn small icon @click="dialog1 = false"><v-icon>mdi-close</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text class="mt-3">
                        <v-container>
                            <strong v-show="required !=''" style="color:red;">{{required}}</strong>
                            <v-row align="center" justify="center">
                                <v-col cols="12" sm="3" md="6">
                                    <v-text-field
                                    v-model="formActive.activity"
                                    label="Activity"
                                    prepend-icon="mdi-ticket"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="3" md="6">
                                    <v-autocomplete
                                        v-model="formActive.action"
                                        :items="eksion"
                                        prepend-icon="mdi-human-dolly"
                                        label="Action"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="3" md="6">
                                    <label for="">Time</label>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                            v-model="formActive.start_time"
                                            label="Start"
                                            type="time"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                            v-model="formActive.end_time"
                                            label="end"
                                            type="time"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" sm="3" md="6">
                                    <v-text-field
                                    v-model="formActive.remark"
                                    label="Remarks"
                                    prepend-icon="mdi-comment-outline"
                                    hint="Example: Dilakukan 1x Seminggu"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <!-- <v-row align="center" justify="center" v-show="typeAdd == 'jadwal'">
                                <v-col cols="12" sm="3" md="6">
                                    <v-menu
                                    v-model="menus4"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                            v-model="formSchedule.tanggal"
                                            label="Tanggal"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="formSchedule.tanggal"
                                        @input="menus4 = false"
                                        color="cyan"
                                        :max="today"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row> -->
                            <v-row align="center" justify="center">
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <!-- <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog1 = false"
                        >Close</v-btn> -->
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" small text @click="submit" class="mr-2"><v-icon left>mdi-content-save</v-icon> Save</v-btn>
                        <v-btn color="yellow darken-3" small text @click="reset"><v-icon left>mdi-reload</v-icon> Reset</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <!-- Tambah Data Banding Dialog -->
        <v-row justify="center">
            <v-dialog v-model="dialog" max-width="400px">
                <v-card>
                    <v-card-title style="background-color:#AD1457; color:white;">
                        <span class="text-h5">{{titles}}</span>
                    </v-card-title>
                    <v-card-text class="mt-3">
                        <v-container>
                            <span>Apakah anda ingin menghapus <strong>{{statment}}</strong> ?</span>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="pink darken-1" @click="submit">Yes</v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
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
    import ProgramService from '@/api/api_program';
    // import moment from 'moment';
    // const now =  moment(new Date()).format("YYYY-MM-DD");
    const activate = {
        id:'',
        activity:'',
        action:'',
        start_time:'',
        end_time:'',
        remark:'',
        location:''
    };
    // const schedule ={
    //     id:'',
    //     activity:'',
    //     scheduller:'',
    //     tanggal: now
    // };
    export default {
        data: () => ({
            links: [
                'Dashboard',
                'Messages',
                'Profile',
                'Updates',
            ],
            Messages:{
                icon:'',
                statment:'',
                color:''
            },
            snackbar: false,
            timeout: 3000,
            headers:[],
            desserts:[],
            eksion: [
                {value:'All Department',text:'All Department'},
                {value:'HSE',text:'HSE'},
                {value:'HSE & All Department',text:'HSE & All Department'},
                {value:'Member P2K3L',text:'Member P2K3L'}
            ],
            search:'',
            dialog: false,
            dialog1: false,
            required: '',
            typeSubmit: 'add',
            formActive:  Object.assign({}, activate),
            titles: '',
            statment:''
        }),
        methods:{
            linked(test){
                this.$router.push(test);
            },
            dataTable(){
                this.headers = [
                    {text: 'No',  value: 'no'},
                    {text: 'Activity', value: 'activity'}, 
                    {text: 'Action By', value: 'action'},       
                    {text: 'Jam Mulai', value: 'time1'},
                    {text: 'Jam Selesai', value: 'time2'},
                    {text: 'Remarks', value: 'remark'},
                    {text: '#', align:'center', value: 'actions'},
                ];

                ProgramService.getAllProgram().then(res => {
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        const list = [];
                        for (let i = 0; i < datas.length; i++) {
                            list[i] = {
                                no: datas[i].id,
                                activity: datas[i].aktifitas,
                                action: datas[i].pelaksana,
                                time1: datas[i].jam_mulai,
                                time2: datas[i].jam_selesai,
                                remark: datas[i].remarks,
                            };
                        }
                        this.desserts = list;
                    } else {
                        console.log('tidak ada data!');
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            AddAktivitas(){
                this.dialog1 = true;
                this.titles = 'Add Activity HSE';
                this.required = '';
                this.typeSubmit = 'add';
                this.formActive = Object.assign({}, this.activate);
            },
            reset(){
                this.formActive = Object.assign({}, this.activate);
            },
            editItem(item){
                this.dialog1 = true;
                this.titles = 'Update Activity HSE';
                this.typeSubmit = 'edit';
                this.formActive.id = item.no;
                this.formActive.activity = item.activity;
                this.formActive.action = item.action;
                this.formActive.start_time = item.time1;
                this.formActive.end_time = item.time2;
                this.formActive.remark = item.remark;
            },
            deleteItem(item){
                this.dialog = true;
                this.statment = item.activity;
                this.titles = 'Delete Activity HSE';
                this.typeSubmit = 'delete';
                this.formActive.id = item.no
                console.log(item);
            },
            submit(){
                const data = {
                    aktifitas: this.formActive.activity,
                    pelaksana: this.formActive.action,
                    jam_mulai: this.formActive.start_time,
                    jam_selesai: this.formActive.end_time,
                    remarks: this.formActive.remark
                };
                if (this.typeSubmit == 'add') {
                    console.log("tambahkan");
                    console.log(data);
                    if (this.formActive.activity != '' && this.formActive.action != '' && this.formActive.start_time != '' && this.formActive.remark != '') {
                        ProgramService.postDataProgram(data).then((res) => {
                            if (res.data.code == 200) {
                                this.dataTable();
                                this.snackbar = true;
                                this.Messages.color = 'success';
                                this.Messages.icon = 'fas fa-check';
                                this.Messages.statment = 'Data berhasil ditambahkan !';
                            } else {
                                this.dataTable();
                                this.snackbar = true;
                                this.Messages.color = 'warning';
                                this.Messages.icon = 'fas fa-exclamation-triangle';
                                this.Messages.statment = 'Proses gagal !';
                                // console.log('tidak ada data!');
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
                    } else{
                        this.snackbar = true;
                        this.Messages.color = 'warning';
                        this.Messages.icon = 'fas fa-exclamation-triangle';
                        this.Messages.statment = 'Data belum lengkap, mohon untuk periksa kembali';
                    }
                } else if (this.typeSubmit == 'delete') {
                    console.log("delete");
                    // console.log(this.formActive);
                    this.dialog = false;
                    ProgramService.deleteDataProgram(this.formActive.id).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Data berhasil dihapus !';
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
                } else {
                    ProgramService.updateDataProgram(this.formActive.id, data).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Data berhasil diupdate !';
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
                    console.log("edit");
                }
            }
        },
        created(){
            this.dataTable();
        }
    }
</script>