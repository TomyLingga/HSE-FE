<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <h3 class="text-h5"><v-icon left>mdi-alert-plus</v-icon> Master Observation</h3>
            </v-col>
            <v-col cols="6">
                <v-card rounded="lg">
                    <v-container fluid>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="3" md="6">
                                <h3 class="text-h6"><v-icon left>mdi-shape</v-icon> Table Categories</h3>
                            </v-col>
                            <v-col cols="12" sm="3" md="2" class="text-right">
                                <v-btn small color="primary" fab @click="addItem('category')">
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
                                        <v-list-item link @click="editItem(item,'category')">
                                            <v-list-item-subtitle style="color:#F57F17;"><v-icon color="yellow darken-4" small left>mdi-pencil</v-icon> Edit</v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item link @click="deleteItem(item,'category')">
                                            <v-list-item-subtitle style="color:#AD1457;"><v-icon color="pink darken-3" small left>mdi-delete</v-icon> Delete</v-list-item-subtitle>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card rounded="lg">
                    <v-container fluid>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="3" md="6">
                                <h3 class="text-h6"><v-icon left>mdi-google-maps</v-icon> Table Location</h3>
                            </v-col>
                            <v-col cols="12" sm="3" md="2" class="text-right">
                                <v-btn small color="primary" fab @click="addItem('lokasi')">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="3" md="4">
                                <v-text-field
                                    label="Search..."
                                    prepend-inner-icon="mdi-magnify"
                                    v-model="search2"
                                    dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-2 mb-2"></v-divider>
                        <v-data-table
                            :headers="headers2"
                            :items="desserts2"
                            :search="search2"
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
                                        <v-list-item link @click="editItem(item,'lokasi')">
                                            <v-list-item-subtitle style="color:#F57F17;"><v-icon color="yellow darken-4" small left>mdi-pencil</v-icon> Edit</v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item link @click="deleteItem(item,'lokasi')">
                                            <v-list-item-subtitle style="color:#AD1457;"><v-icon color="pink darken-3" small left>mdi-delete</v-icon> Delete</v-list-item-subtitle>
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
                            <v-row v-if="ket == 'category'">
                                <v-col cols="12">
                                    <v-text-field
                                    v-model="formInput.observasi"
                                    prepend-inner-icon="mdi-cloud-search"
                                    label="Kategori Observasi"
                                    ></v-text-field>
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
                            <v-row v-else>
                                <v-col cols="12">
                                    <v-text-field
                                    v-model="formInput2.nama_locations"
                                    prepend-inner-icon="mdi-cloud-search"
                                    label="Location"
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

        <!-- Delete Form Dialog -->
        <v-row justify="center">
            <v-dialog v-model="dialog1" max-width="400px">
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
// import moment from 'moment';

// API Axios
import ObservationService from '@/api/api_observasi';

export default {
    data: () => ({
            user: JSON.parse(localStorage.user),
            
            // DataTable Category
            headers:[],
            desserts:[],
            search:'',

            // DataTable Location
            headers2:[],
            desserts2:[],
            search2:'',

            // Form Input
            formInput2:{
                id:'',
                nama_locations:'',
            },

            // Form Input
            formInput:{
                id:'',
                observasi:'',
                keterangan:'',
            },
            menus:false,
            dialog:false,
            dialog1:false,
            titles:'',
            required:'',
            typeSubmit:'',
            statment:'',
            ket:'',

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
                    {text:'Categories', value:'list'},
                    {text:'#', align:'center', value:'actions'}
                ];
                ObservationService.getAllCategories().then((res) => {
                    const load = [];
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        for (let i = 0; i < datas.length; i++) {
                            load[i] = {
                                id: i+1,
                                list: datas[i].nama_categories,
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
            dataTable2(){
                this.headers2 = [
                    {text:'ID',value:'id'},
                    {text:'Location Name', value:'location'},
                    {text:'#', align:'center', value:'actions'}
                ];
                ObservationService.getAllLocation().then((res) => {
                    const load = [];
                    if (res.data.code == 200) {
                        const datas = res.data.data;
                        for (let i = 0; i < datas.length; i++) {
                            load[i] = {
                                id: i+1,
                                location: datas[i].nama_locations,
                            }
                        }
                    } else {
                        load[0] = {
                            id: null,
                            location: null,
                        }
                    }
                    this.desserts2 = load;
                }).catch((err) => {
                    console.log(err);
                });
            },
            addItem(item){
                this.dialog = true;
                if (item == 'category') {
                    this.typeSubmit = 'add';
                    this.titles = 'Tambah List Kategori';
                    this.formInput = {
                        id: '',
                        observasi: '',
                        keterangan:'',
                    };
                } else {
                    this.typeSubmit = 'add lokasi';
                    this.titles = 'Tambah List Lokasi';
                    this.formInput2 = {
                        id: '',
                        nama_locations: '',
                    };
                }
                this.ket = item;
            },
            editItem(item, type){
                this.dialog = true;
                if (type == 'category') {
                    this.typeSubmit = 'edit';
                    this.titles = 'Edit List Kategori';
                    ObservationService.getCategoriesByName(item.list).then((res) => {
                        const datas = res.data.data;
                        if (res.data.code == 200) {
                            this.formInput.id = datas.id;
                            this.formInput.observasi = datas.nama_categories;
                            this.formInput.keterangan = datas.keterangan_categories;
                        } else {
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
                        this.dialog = false;
                    });
                } else {
                    this.typeSubmit = 'edit lokasi';
                    this.titles = 'Edit List Lokasi';
                    ObservationService.getLocationByName(item.location).then((res) => {
                        const datas = res.data.data;
                        if (res.data.code == 200) {
                            this.formInput2.id = datas.id;
                            this.formInput2.nama_locations = datas.nama_locations;
                        } else {
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
                        this.dialog = false;
                    });
                }
                this.ket = type;
            },
            deleteItem(item, type){
                this.dialog1 = true;
                if (type == 'category') {
                    this.typeSubmit = 'delete';
                    this.titles = 'Delete List Kategori';
                    this.statment = item.list;
                    this.formInput.observasi = item.list;
                } else {
                    this.typeSubmit = 'delete lokasi';
                    this.titles = 'Delete List Lokasi';
                    this.statment = item.location;
                    this.formInput2.nama_locations = item.location;
                }
                this.ket = type;
            },
            reset(){
                this.formInput = {
                    observasi:'',
                    keterangan:'',
                };
            },
            submit(){
                // this.typeSubmit == 'add'
                if (this.typeSubmit == 'add') {
                    const data =  {
                        nama_categories: this.formInput.observasi,
                        keterangan_categories: this.formInput.keterangan,
                    }
                    ObservationService.postDataCategories(data).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Penambahan data sukses !';
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
                } else if (this.typeSubmit == 'edit') {
                    const data =  {
                        id: this.formInput.id,
                        nama_categories: this.formInput.observasi,
                        keterangan_categories: this.formInput.keterangan,
                    }
                    ObservationService.updateDataCategories(data).then((res) => {
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
                } else if (this.typeSubmit == 'add lokasi') {
                    const data =  {
                        nama_locations: this.formInput2.nama_locations,
                    }
                    ObservationService.postDataLocation(data).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable2();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Penambahan data sukses !';
                        } else {
                            this.dataTable2();
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
                } else if (this.typeSubmit == 'edit lokasi') {
                    const data =  {
                        id: this.formInput2.id,
                        nama_locations: this.formInput2.nama_locations,
                    }
                    ObservationService.updateDataLocation(data).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable2();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Update data sukses !';
                        } else {
                            this.dataTable2();
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
                } else if (this.typeSubmit == 'delete lokasi') {
                    ObservationService.deleteDataLocation(this.formInput2.nama_locations).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable2();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Hapus data sukses !';
                        } else {
                            this.dataTable2();
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
                } else {
                    ObservationService.deleteDataCategories(this.formInput.observasi).then((res) => {
                        if (res.data.code == 200) {
                            this.dataTable();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Hapus data sukses !';
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
            this.dataTable2();
        }
}
</script>