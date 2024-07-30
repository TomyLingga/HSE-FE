<template>
    <v-container>
        <h3 class="text-h4"><v-icon class="text-h4" left>mdi-account-card</v-icon> Cards</h3>
        <v-row align="center" justify="center">
            <v-col cols="6" class="text-center" style="color:#C51162;">
                <v-icon class="text-h2" color="pink accent-4">mdi-skull</v-icon><br>
                <h3 class="text-h6">Last Accident</h3>
                <span>Keterangan: {{last_acident.ket}}</span>
                <h3 class="text-h3">{{last_acident.jml}}</h3>
                <v-row align="center" justify="center" class="mt-3">
                    <v-btn small text @click="edit('accident')"><v-icon>mdi-pencil</v-icon> Edit</v-btn>
                </v-row>
            </v-col>
            <v-col cols="6" class="text-center" style="color:#FF8F00;">
                <v-icon class="text-h2" color="amber darken-3">mdi-medical-bag</v-icon>
                <h3 class="text-h6">TOTAL SAFE WORKED DAYS</h3>
                <h3 class="text-h3">{{total_safe_worked}}</h3>
                <v-row align="center" justify="center" class="mt-3">
                    <v-btn small text @click="edit('safe')"><v-icon>mdi-pencil</v-icon> Edit</v-btn>
                </v-row>
            </v-col>
            <v-col cols="8" class="text-center" style="color: #00BFA5;">
                <v-icon class="text-h2" color="teal accent-4">mdi-briefcase-clock</v-icon><br>
                <h3 class="text-h6">TOTAL MANHOURS WORKED WITHOUT LOSE ACCIDENT</h3>
                <h3 class="text-h3">{{total_man_hours}}</h3>
                <v-row align="center" justify="center" class="mt-3">
                    <v-btn small text @click="edit('manhours')"><v-icon>mdi-pencil</v-icon> Edit</v-btn>
                </v-row>
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
                            <v-row align="center" v-if="typeSubmit=='accident'">
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
                                            v-model="input_acident.tgl"
                                            label="Date Accident"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="input_acident.tgl"
                                        @input="menus = false"
                                        color="cyan"
                                        :max="today"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                    v-model="input_acident.jml"
                                    type="number"
                                    prepend-inner-icon="mdi-skull"
                                    label="Jumlah Korban"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                    label="Keterangan"
                                    auto-grow
                                    v-model="input_acident.ket"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row align="center" v-else>
                                <v-col cols="6">
                                    <v-text-field
                                    v-model="input_total"
                                    type="number"
                                    prepend-inner-icon="mdi-counter"
                                    label="Input Total"
                                    ></v-text-field>
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
    import PictureService from '@/api/api_gambar';

    export default {
        data: () => ({
            menus:false,
            last_acident:{
                tgl:moment(new Date).format('YYYY-MM-DD'),
                jml:'0',
                ket:'',
            },
            input_acident:{
                tgl:moment(new Date).format('YYYY-MM-DD'),
                jml:'0',
                ket:'',
            },
            today:moment(new Date).format('YYYY-MM-DD'),

            // Input Total
            input_total:'',
            total_man_hours:'0',
            total_safe_worked:'0',

            // Notifikasi
            Messages:{
                icon:'',
                statment:'',
                color:''
            },
            snackbar: false,
            timeout: 3000,

            dialog:false,
            titles:'',
            typeSubmit:'',
        }),
        methods:{
            link(test){
                this.$router.push(test);
            },
            getAccident(){
                PictureService.getAccident().then((res) => {
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        this.last_acident.jml = datas[0].jumlah_korban;
                        this.last_acident.ket = datas[0].keterangan_accident;
                    } else {
                        this.last_acident.jml = '0';
                        this.last_acident.ket = '';
                    }
                }).catch((err) => {
                    console.log(err);
                    this.last_acident.jml = '?';
                    this.last_acident.ket = '?';
                });
            },
            getTotalSafe(){
                const jenis = 'safe';
                PictureService.getTotal(jenis).then((res) => {
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        this.total_safe_worked = datas.jumlah_total;
                    } else {
                        this.total_safe_worked = '0';
                    }
                }).catch((err) => {
                    console.log(err);
                    this.total_safe_worked = '?';
                });
            },
            getTotalManhours(){
                const jenis = 'manhours';
                PictureService.getTotal(jenis).then((res) => {
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        this.total_man_hours = datas.jumlah_total;
                    } else {
                        this.total_man_hours = '0';
                    }
                }).catch((err) => {
                    console.log(err);
                    this.total_man_hours = '?';
                });
            },
            edit(variable){
                this.dialog = true;
                if (variable == 'accident') {
                    this.titles = 'Update Data Last Accident';
                    this.typeSubmit = 'accident';
                    this.input_acident = {
                        tgl:this.last_acident.tgl,
                        jml:this.last_acident.jml,
                        ket:this.last_acident.ket,
                    };
                } else if (variable == 'safe') {
                    this.titles = 'Update Data Safe Worked';
                    this.typeSubmit = 'safe';
                    this.input_total = this.total_safe_worked;
                } else {
                    this.titles = 'Update Data Manhours Worked';
                    this.typeSubmit = 'manhours';
                    this.input_total = this.total_man_hours;
                }
            },
            reset(){

            },
            submit(){
                if (this.typeSubmit == 'accident') {
                    const data = {
                        tgl_accident: this.input_acident.tgl,
                        jumlah_korban: this.input_acident.jml,
                        keterangan_accident: this.input_acident.ket
                    }
                    PictureService.postAccident(data).then((res) => {
                        if (res.data.code == 200) {
                            this.getAccident();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Update data sukses !';
                        } else {
                            this.getAccident();
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
                } else if (this.typeSubmit == 'safe') {
                    const data = {
                        jenis_input : this.typeSubmit,
                        jumlah_total : this.input_total
                    }
                    PictureService.postTotal(data).then((res) => {
                        if (res.data.code == 200) {
                            this.getTotalSafe();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Update data sukses !';
                        } else {
                            this.getTotalSafe();
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
                    const data = {
                        jenis_input : this.typeSubmit,
                        jumlah_total : this.input_total
                    }
                    PictureService.postTotal(data).then((res) => {
                        if (res.data.code == 200) {
                            this.getTotalManhours();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Update data sukses !';
                        } else {
                            this.getTotalManhours();
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
                }
            }
        },
        created(){
            this.getAccident();
            this.getTotalSafe();
            this.getTotalManhours();
        }
    }
</script>