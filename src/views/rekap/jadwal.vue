<template>
    <v-container fluid>
        <v-card flat>
            <v-card-text>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="3" md="6">
                        <h3 class="text-h6"><v-icon left>mdi-table</v-icon> Table Schedulle</h3>
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
            </v-card-text>
        </v-card>
        <!-- Tambah Data Banding Dialog -->
        <v-row justify="center">
            <v-dialog v-model="dialog1" max-width="1100px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{titles}}</span>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="dialog1 = false"><v-icon>mdi-close</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text class="mt-3">
                        <v-container>
                            <strong v-show="required !=''" style="color:red;">{{required}}</strong>
                            <v-row align="center" justify="center">
                                <v-col cols="12" sm="3" md="3">
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
                                            v-model="schedule.tanggal"
                                            label="Tanggal"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="schedule.tanggal"
                                        @input="menus4 = false"
                                        color="cyan"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="3" md="4">
                                    <v-autocomplete
                                        v-model="schedule.activity"
                                        :items="items"
                                        prepend-icon="mdi-ticket"
                                        label="Activity"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="3" md="3">
                                    <v-text-field
                                    v-model="schedule.area"
                                    label="Area"
                                    prepend-icon="mdi-google-maps"
                                    hint="Example: Area"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="center">
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn small color="teal" outlined @click="submit" class="mr-2"><v-icon small left>mdi-content-save</v-icon>Save</v-btn>
                        <v-btn small color="lime" outlined @click="reset" class="mr-2"><v-icon small left>mdi-reload</v-icon> Reset</v-btn>
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
    import moment from 'moment';
    import ProgramService from '@/api/api_program';
    const now =  moment(new Date()).format("YYYY-MM-DD");
    // const activate = {
    //     id:'',
    //     activity:'',
    //     action:'',
    //     start_time:'',
    //     end_time:'',
    //     remark:'',
    //     location:''
    // };
    // const schedule ={
    //     id:'',
    //     activity:'',
    //     area:'',
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
            headers:[],
            desserts:[],
            search:'',
            dialog1: false,
            required: '',
            typeSubmit: 'add',
            Messages:{
                icon:'',
                statment:'',
                color:''
            },
            snackbar: false,
            timeout: 3000,
            items:[],
            schedule:{
                id:'',
                activity:'',
                area:'',
                tanggal: now
            },
            // formActive:  Object.assign({}, schedule),
            titles: '',
            today: now,
            menus4:false
        }),
        methods:{
            linked(test){
                this.$router.push(test);
            },
            dataTable(){
                this.headers = [
                    {text: 'ID',  value: 'no'},
                    {text: 'Activity', value: 'activity'}, 
                    {text: 'Area', value: 'area'},       
                    {text: 'Tanggal', value: 'tanggal'},
                    {text: '#', value: 'actions'},
                ];
                ProgramService.getAllSchedule().then(res => {
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        const list = [];
                        for (let i = 0; i < datas.length; i++) {
                            list[i] = {
                                no: datas[i].id,
                                activity: datas[i].aktifitas,
                                area: datas[i].area,
                                tanggal: datas[i].tanggal,
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
            programSchedule(){
                ProgramService.getAllProgram().then(res => {
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        const list = [];
                        for (let i = 0; i < datas.length; i++) {
                            list[i] = {
                                value: datas[i].id,
                                text: datas[i].aktifitas,
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
            AddAktivitas(){
                this.dialog1 = true;
                this.titles = 'Tambah Schedule';
                this.required = '';
                this.typeSubmit = 'add';
                this.schedule = {
                    id:'',
                    activity:'',
                    area:'',
                    tanggal: this.today
                };
                this.programSchedule();
                // this.formActive = Object.assign({}, this.schedule);
            },
            editItem(item){
                ProgramService.getScheduleByID(item.no).then((res) => {
                    if (res.data.code == 200) {
                        this.programSchedule();
                        const datas = res.data.data;
                        this.schedule = {
                            id:item.no,
                            activity:datas.id_activity,
                            area:datas.area,
                            tanggal: datas.tanggal
                        };
                        this.dialog1 = true;
                        this.titles = 'Edit Schedule';
                        this.required = '';
                        this.typeSubmit = 'edit';
                    } else {
                        this.schedule = {
                            id:'',
                            activity:'',
                            area:'',
                            tanggal: this.today
                        };
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
                    this.dialog1 = false;
                });
            },
            reset(){
                this.schedule = {
                    id:'',
                    activity:'',
                    area:'',
                    tanggal: this.today
                };
            },
            submit(){
                if (this.typeSubmit == 'add') {
                    console.log("tambahkan");
                    const data = {
                        id_activity: this.schedule.activity.toString(),
                        area: this.schedule.area,
                        tanggal: this.schedule.tanggal
                    };
                    ProgramService.postDataSchedule(data).then((res) => {
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
                } else if (this.typeSubmit == 'edit') {
                    console.log("edit");
                    const data = {
                        id_activity: this.schedule.activity,
                        area: this.schedule.area,
                        tanggal: this.schedule.tanggal
                    };
                    ProgramService.updateDataSchedule(this.schedule.id,data).then((res) => {
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
                } else {
                    console.log("Edit");
                }
            }
        },
        created(){
            this.dataTable();
        }
    }
</script>