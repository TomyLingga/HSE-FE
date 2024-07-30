<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <h3 class="text-h5"><v-icon left>mdi-image-multiple</v-icon>Image Slides</h3>
            </v-col>
            <v-col cols="6" class="text-right">
                <v-btn small color="primary" @click="addImage">New Item</v-btn>
            </v-col>
            <v-col cols="3"
            v-for="(item) in items"
            :key="item.src">
                <v-sheet
                rounded="lg"
                class="text-center"
                >
                    <v-container fluid>
                        <img
                        elevation="20"
                        :src="item.src"
                        height="140"
                        > <br>
                        <strong v-if="item.status == 1" style="color:#00C853;">Publish</strong>
                        <strong v-else style="color:red;">Not Publish</strong>
                        <br>
                        <span>No. Urutan: {{item.urutan}}</span>
                        <v-divider></v-divider>
                        <v-btn icon v-show="item.status == 1"><v-icon title="Inactive" color="warning" @click="unpublishImage(item)">mdi-close-thick</v-icon></v-btn>
                        <v-btn icon v-show="item.status == 0"><v-icon title="Active" color="success" @click="publishImage(item)">mdi-check-bold</v-icon></v-btn>
                        <v-btn icon><v-icon title="Delete" color="red" @click="deleteImage(item)">mdi-delete</v-icon></v-btn>
                    </v-container>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-dialog
            v-model="dialog"
            max-width="300"
            >
                <v-card>
                    <v-card-title class="text-h5">{{title}}</v-card-title>
                    <v-card-text>
                        <span>{{statment}}</span><br>
                        <v-text-field
                            v-show="typeSubmit == 'publish'"
                            label="Order Number"
                            class="mt-2"
                            prepend-inner-icon="mdi-image-text"
                            v-model="published.order_number"
                            type="number"
                            outlined
                            dense
                            rounded
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red"
                            text
                            @click="dialog = false"
                        >
                            No
                        </v-btn>
                        <v-btn
                            color="green darken-1"
                            text
                            @click="submit"
                        >
                            Yes
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row justify="center">
            <v-dialog
            v-model="dialog1"
            max-width="450"
            >
                <v-card>
                    <v-card-title class="text-h5">{{title}}</v-card-title>
                    <v-card-text>
                        <span></span>
                        <v-file-input
                            v-model="file"
                            show-size
                            counter
                            accept="image/*"
                            label="File input image"
                        ></v-file-input>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red"
                            text
                            @click="dialog1 = false"
                        >
                            No
                        </v-btn>
                        <v-btn
                            color="green darken-1"
                            text
                            @click="submit"
                        >
                            Save
                        </v-btn>
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
                    small
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
    import PictureService from '@/api/api_gambar';
    export default {
        data: () => ({
            links: [
                'Dashboard',
                'Messages',
                'Profile',
                'Updates',
            ],
            published:{
                order_number:0,
                id:''
            },
            Messages:{
                icon:'',
                statment:'',
                color:''
            },
            snackbar: false,
            timeout: 3000,
            tab:'',
            items:[],
            dialog:false,
            dialog1:false,
            title:'',
            statment:'',
            typeSubmit:'',
            typeStatus:'',
            file:'',
        }),
        methods:{
            link(test){
                this.$router.push(test);
            },
            loadGambar(){
                PictureService.getAllPicture().then((res) => {
                    const load = [];
                    if (res.data.code == 200) {
                        const datas = res.data.slides;
                        for (let i = 0; i < datas.length; i++) {
                            load[i] = {
                                id: datas[i].id,
                                src: datas[i].gambar,
                                status: datas[i].status,
                                urutan: datas[i].urutan,
                            }
                        }
                    } else {
                        load[0] = {
                            id: null,
                            src: null,
                            status: null,
                            urutan: null,
                        }
                    }
                    this.items = load;
                }).catch((err) => {
                    console.log(err);
                });
                console.log(this.items);
            },
            addImage()
            {
                this.dialog1 = true;
                this.title = 'Add Image';
                this.typeSubmit = 'add';
                this.file = null;
            },
            deleteImage(items)
            {
                this.dialog = true;
                this.title = 'Delete Image';
                this.statment = 'Do you want to delete it?';
                this.typeSubmit = 'delete';
                console.log(items);
                this.published.id = items.id;
                // this.file = items;
            },
            publishImage(items){
                this.dialog = true;
                this.title = 'Publish Image';
                this.statment = 'Do you want to publish it?';
                this.typeSubmit = 'publish';
                this.published.order_number = items.urutan
                this.published.id = items.id;
                this.file = items;
            },
            unpublishImage(items){
                this.dialog = true;
                this.title = 'Not Publish Image';
                this.statment = 'Do you want to not published it?';
                this.typeSubmit = 'unpublish';
                this.published.id = items.id;
            },
            submit(){
                if (this.typeSubmit == 'add') {
                    console.log(this.file);
                    console.log('Tambah');
                    this.dialog1 = false;
                    let formData = new FormData();
                    formData.append('gambar', this.file);
                    console.log(formData);
                    PictureService.uploadPicture(formData).then((res) => {
                        if (res.data.code == 200) {
                            this.loadGambar();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Upload gambar sukses !';
                        } else {
                            this.loadGambar();
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
                } else if (this.typeSubmit == 'delete') {
                    PictureService.deletePicture(this.published.id).then((res) => {
                        if (res.data.code == 200) {
                            this.loadGambar();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Data berhasil dihapus !';
                        } else {
                            this.loadGambar();
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
                    console.log('Hapus');
                    this.dialog = false;
                } else if (this.typeSubmit == 'publish') {
                    const data = {
                        urutan: this.published.order_number
                    }
                    PictureService.publishPicture(this.published.id,data).then((res) => {
                        if (res.data.code == 200) {
                            this.loadGambar();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Data berhasil dipublish !';
                        } else {
                            this.loadGambar();
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
                    // this.dialog = false;
                } else {
                    PictureService.unpublishPicture(this.published.id).then((res) => {
                        if (res.data.code == 200) {
                            this.loadGambar();
                            this.snackbar = true;
                            this.Messages.color = 'success';
                            this.Messages.icon = 'fas fa-check';
                            this.Messages.statment = 'Unpublish Sukses !';
                        } else {
                            this.loadGambar();
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
            this.loadGambar();
        }
    }
</script>