<template>
    <v-container fluid class="justify-center align-center">
        <v-card
            class="mx-auto"
            style="margin-top:110px;"
            max-width="500"
        >
            <v-container>
                <v-list-item>
                    <v-list-item-content>
                        <div class="text-h6 mb-4" style="color:#2E7D32;">PT. INDUSTRI NABATI LESTARI</div>
                        <v-list-item-title class="text-overline mb-1">Health, Safety & Environment</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-avatar
                        tile
                        size="80"
                    >
                    <img
                        src="K3.png"
                        alt="HSE"
                    >
                    </v-list-item-avatar>
                </v-list-item>
                <v-card-text>
                    <v-text-field
                        label="Email"
                        dense
                        v-model="username"
                        prepend-icon="mdi-email"
                    ></v-text-field>
                    <v-text-field
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        name="input-10-2"
                        v-model="password"
                        dense
                        label="Password"
                        class="input-group--focused"
                        @click:append="show2 = !show2"
                        prepend-icon="mdi-lock"
                    ></v-text-field>
                    <!-- <v-text-field
                        label="Password"
                        dense
                        
                    ></v-text-field> -->
                </v-card-text>
                <v-card-actions>
                    <v-row>
                        <v-col cols="12" class="text-right">
                            <v-btn
                                color="teal"
                                dark
                                small
                                class="mr-2"
                                @click="submit"
                            >
                                <v-icon small left>mdi-login-variant</v-icon> Login
                            </v-btn>
                            <v-btn
                                color="warning"
                                dark
                                small
                                @click="link({path:'/home'})"
                            >
                                <v-icon small left>mdi-subdirectory-arrow-left</v-icon> Back
                            </v-btn>

                        </v-col>
                    </v-row>
                </v-card-actions>
                <v-divider class="mt-4"></v-divider>
                <v-card-subtitle class="text-center">
                    <span>HSE - Copyright &copy; <strong>IT.INL</strong> 2022</span>
                </v-card-subtitle>
            </v-container>
        </v-card>
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
                    small
                    >
                    <v-icon :color="Messages.color">mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
        </v-row>
    </v-container>
</template>
<script>
    import AuthService from '@/api/api_auth';
    export default {
        data () {
            return {
                snackbar:false,
                timeout:3000,
                show2: false,
                username:'',
                password:'',
                Messages : {
                    color: '',
                    icon: '',
                    statment: ''
                },
                loggedIn: localStorage.getItem('loggedIn'),
                token: localStorage.getItem('usertoken'),
            }
        },
        methods:{
            async submit(){
                const data = {
                    email: this.username,
                    password: this.password
                }
                try {
                    const response = await AuthService.signIn(data);
                    const load = response.data
                    if (load != null) {
                        const roles = load.data.user.role
                        const accessToken = load.data.accessToken
                        const user = load.data.user
                        console.log(roles);
                        console.log(accessToken);
                        console.log(user);
                        localStorage.setItem('user', JSON.stringify(user));
                        localStorage.setItem('usertoken', accessToken);
                        localStorage.setItem('loggedIn', 'true');
                        localStorage.setItem('roles', roles);
                        this.loggedIn = true;
                        this.snackbar = true;
                        this.Messages.color = 'success';
                        this.Messages.icon = 'fas fa-check';
                        this.Messages.statment = 'Login sebagai user berhasil. !';
                        if (roles == 'admin') {
                            this.$router.push({path: '/accesshome'});
                            // setTimeout(function() {
                            // }, 3000);
                        } else if (roles == 'user') {
                            this.$router.push({path: '/homeuser'});
                            // setTimeout(function() {
                            // }, 3000);
                        } else {
                            this.$router.push({path: '/beranda'});
                            // setTimeout(function() {
                            // }, 3000);
                        }
                    } else {
                        this.snackbar = true;
                        this.Messages.color = 'warning';
                        this.Messages.icon = 'fas fa-exclamation-triangle';
                        this.Messages.statment = 'Akun anda tidak terdaftar. !';
                        this.forms.username = '';
                        this.forms.password = '';
                        this.$router.push({path: '/signin'});
                    }
                    console.log(response)
                } catch(err) {
                    console.log(err)
                    this.snackbar = true;
                    this.Messages.color = 'error';
                    this.Messages.icon = 'fas fa-info';
                    this.Messages.statment = 'Terjadi kesalahan sistem, silahkan hubungi tim IT !';
                }
                // Api.AuthService().signIn(data).then(data => {
                //     console.log(data);
                //     if (data.code == 200) {
                //         localStorage.setItem('user', JSON.stringify(data.data.user));
                //         localStorage.setItem('usertoken', data.data.accessToken);
                //         localStorage.setItem('loggedIn', 'true');
                //         localStorage.setItem('roles', data.data.user.role);
                //         this.loggedIn = true;
                //         if (localStorage.getItem('usertoken') != null) {
                //             if (this.$route.params.nextUrl != null) {
                //                 this.$router.push(this.$route.params);
                //             } else {
                //                 const uses = JSON.parse(localStorage.user);
                //                 if (uses.role == 'admin') {
                //                     this.snackbar = true;
                //                     this.Messages.color = 'success';
                //                     this.Messages.icon = 'fas fa-check';
                //                     this.Messages.statment = 'Login sebagai user berhasil. !';
                //                     this.$router.push({path: '/accesshome'});
                //                 } else if (uses.role == 'user') {
                //                     this.snackbar = true;
                //                     this.Messages.color = 'success';
                //                     this.Messages.icon = 'fas fa-check';
                //                     this.Messages.statment = 'Login sebagai user berhasil. !';
                //                     this.$router.push({path: '/homeuser'});
                //                 } else {
                //                     this.snackbar = true;
                //                     this.Messages.color = 'success';
                //                     this.Messages.icon = 'fas fa-check';
                //                     this.Messages.statment = 'Login sebagai user berhasil. !';
                //                     this.$router.push({path: '/beranda'});
                //                 }
                //             }
                //         } else {
                //             this.$router.push({path: '/signin'});
                //         }
                //     } else if (data.code == 505) {
                //         this.snackbar = true;
                //         this.Messages.color = 'warning';
                //         this.Messages.icon = 'fas fa-exclamation-triangle';
                //         this.Messages.statment = 'Password anda salah. !';
                //         this.forms.password = '';
                //         this.$router.push({path: '/signin'});
                //     } else {
                //         this.snackbar = true;
                //         this.Messages.color = 'warning';
                //         this.Messages.icon = 'fas fa-exclamation-triangle';
                //         this.Messages.statment = 'Akun anda tidak terdaftar. !';
                //         this.forms.username = '';
                //         this.forms.password = '';
                //         this.$router.push({path: '/signin'});
                //     }
                // }).catch(err => {
                //     console.log(err)
                //     this.snackbar = true;
                //     this.Messages.color = 'error';
                //     this.Messages.icon = 'fas fa-info';
                //     this.Messages.statment = 'Terjadi kesalahan sistem, silahkan hubungi tim IT !';
                // });
                // this.$router.push({path:'/accesshome'});
                console.log(data);
            },
            link(test){
                this.$router.push(test);
            }
        },
        mounted()
        {
            if (!this.loggedIn) {
                return this.$router.push({ path: '/signin' })
            }
        }
    }
</script>