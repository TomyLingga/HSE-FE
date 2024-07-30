<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-row align="center" justify="center">
                    <v-col cols="6">
                        <h3 class="text-h5"><v-icon left>mdi-account-multiple</v-icon>USER ADMINISTRATOR</h3>
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <!-- <v-btn small color="primary">New Item</v-btn> -->
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-sheet
                rounded="lg"
                >
                    <v-container fluid>
                        <v-row>
                            <v-col cols="4">
                                <strong><v-icon left>mdi-account-circle</v-icon> User Account</strong>
                            </v-col>
                            <v-col cols="4" class="text-right">
                                <v-btn small color="primary" @click="addUser()"><v-icon left>mdi-plus</v-icon> Add Account</v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                label="Search..."
                                prepend-inner-icon="mdi-magnify"
                                v-model="search"
                                dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider class="my-2"></v-divider>
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
                                        text
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
                </v-sheet>
            </v-col>
            <!-- <v-col cols="12">
                <v-sheet
                rounded="lg"
                >
                    <v-container fluid>
                        <v-row>
                            <v-col cols="4">
                                <strong><v-icon left>mdi-shield-account</v-icon> HSE Squad</strong>
                            </v-col>
                            <v-col cols="4" class="text-right">
                                <v-btn small color="primary"><v-icon left>mdi-plus</v-icon> Add Squad</v-btn>
                            </v-col>
                            <v-col cols="4" class="text-right">
                                <v-text-field
                                label="Search..."
                                prepend-inner-icon="mdi-magnify"
                                v-model="search2"
                                dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider class="my-2"></v-divider>
                        <v-data-table
                        :headers="headers2"
                        :items="desserts2"
                        :search="search2"
                        class="mt-2"
                        dense
                        ></v-data-table>
                    </v-container>
                </v-sheet>
            </v-col> -->
        </v-row>

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
                                <v-col cols="6">
                                    <v-text-field
                                    v-model="formInput.nama"
                                    label="Nama"
                                    prepend-icon="mdi-account-circle"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                    v-model="formInput.email"
                                    label="Email"
                                    prepend-icon="mdi-email"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                    v-model="formInput.password"
                                    label="Password"
                                    @click:append="show2 = !show2"
                                    prepend-icon="mdi-lock"
                                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show2 ? 'text' : 'password'"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                    :items="roles"
                                    v-model="formInput.role"
                                    label="Role"
                                    prepend-icon="mdi-octagram"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" @click="submit" small text class="mr-2"><v-icon left>mdi-content-save</v-icon> Save</v-btn>
                        <v-btn color="yellow darken-3" @click="reset" small text><v-icon left>mdi-reload</v-icon> Reset</v-btn>
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
                    <v-icon small>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
        </v-row>
    </v-container>
</template>
<script>

    // API Axios
    import UserService from '@/api/api_user';

    export default {
        data: () => ({
            links: [
                'Dashboard',
                'Messages',
                'Profile',
                'Updates',
            ],
            tab:'',

            // Table User Akun
            headers:[],
            desserts:[],
            search:'',

            // Table Squad
            headers2:[],
            desserts2:[],
            search2:'',

            // Form User
            dialog1: false,
            titles:'',
            required:'',
            formInput:{
                id:'',
                nama:'',
                email:'',
                role:'',
                password:''
            },
            show2: false,
            roles:[
                {text:'Super Admin', value:'admin'},
                {text:'Admin', value:'user'},
                {text:'User', value:'dst'},
            ],
            typeSubmit:'',

            // Form Delete
            dialog:false,
            statment:'',

            // Notifikasi
            snackbar:false,
            timeout:3000,
            Messages:{
                color:'',
                statment:'',
                icon:'',
            }
        }),
        methods:{
            link(test){
                this.$router.push(test);
            },
            tableUserAccount(){
                this.headers = [
                    {text: 'No',  value: 'no'},
                    {text: 'Nama',  value: 'nama'},
                    {text: 'Email',  value: 'email'},
                    {text: 'Role',  value: 'role'},
                    {text: '#', align:'center',  value: 'actions'},
                ];
                UserService.getAllUser().then((res) => {
                    const load = [];
                    if (res.data.code == 200) {
                        const datas = res.data.users;
                        for (let i = 0; i < datas.length; i++) {
                            let roler;
                            if (datas[i].role == 'admin') {
                                roler = 'Super Admin';
                            } else if (datas[i].role == 'user') {
                                roler = 'Admin';
                            } else {
                                roler = 'User';
                            }
                            load[i] = {
                                no: i+1,
                                nama: datas[i].name,
                                email: datas[i].email,
                                role: roler,
                            }
                        }
                    } else {
                        load[0] = {
                            no: null,
                            nama: null,
                            email: null,
                            role: null,
                        }
                    }
                    this.desserts = load;
                }).catch((err) => {
                    console.log(err);
                });
            },
            addUser(){
                this.dialog1 = true;
                this.titles = 'Tambah User';
                this.typeSubmit='add';
                this.formInput = {
                    id:'',
                    nama:'',
                    email:'',
                    role:'',
                    password:''
                };
            },
            editItem(item){
                this.dialog1 = true;
                this.titles = 'Edit User';
                this.typeSubmit='edit';
                UserService.getUserByID(item.email).then((res) => {
                    if (res.data.code == 200) {
                        const datas = res.data.user
                        this.formInput = {
                            id: datas.id,
                            nama:datas.name,
                            email:datas.email,
                            role:datas.role,
                            password:''
                        }
                    } else {
                        this.formInput = {
                            id:'',
                            nama:'',
                            email:'',
                            role:'',
                            password:''
                        };
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            deleteItem(item){
                this.formInput.email = item.email;
                this.dialog = true;
                this.statment = this.formInput.email;
                this.titles = 'Delete User';
            },
            reset(){
                this.formInput = {
                    nama:'',
                    email:'',
                    role:'',
                    password:''
                };
            },
            submit(){
                if (this.typeSubmit == 'add') {
                    const post = {
                        name: this.formInput.nama,
                        role: this.formInput.role,
                        email: this.formInput.email,
                        password: this.formInput.password,
                    }
                    UserService.postUser(post).then((res) => {
                        if (res.data.code == 200) {
                            this.tableUserAccount();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Penambahan data sukses !';
                        } else {
                            this.tableUserAccount();
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
                    const post = {
                        id: this.formInput.id,
                        name: this.formInput.nama,
                        role: this.formInput.role,
                        email: this.formInput.email,
                        password: this.formInput.password,
                    }
                    UserService.updateUser(post).then((res) => {
                        if (res.data.code == 200) {
                            this.tableUserAccount();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Update data sukses !';
                        } else {
                            this.tableUserAccount();
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
                    UserService.deleteUser(this.formInput.email).then((res) => {
                        if (res.data.code == 200) {
                            this.tableUserAccount();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Update data sukses !';
                        } else {
                            this.tableUserAccount();
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
                    console.log('delete');
                }
            },
        },
        created(){
            this.tableUserAccount();
            // this.tableSquad();
        }
    }
</script>