export const STATS_DATA = [
    { title: 'Motif', text: 'Beragam motif yang penuh makna' },
    { title: 'Proses', text: 'Dari mencanting hingga menjadi kain' },
    { title: 'Warisan', text: 'Budaya turun menurun Kota Solo' }
];

export const GALLERY_DATA = [
    { src: 'img/membatik8.jpg', caption: 'Proses Mencanting' },
    { src: 'img/membatik7.jpg', caption: 'Proses Pewarnaan Alami' },
    { src: 'img/membatik6.jpg', caption: 'Proses Lorod (Pelepasan Lilin)' },
    { src: 'img/membatik5.jpg', caption: 'Kain Batik Siap Digunakan' },
    { src: 'img/membatik3.jpg', caption: 'Proses Mencanting (Malam)' },
    { src: 'img/membatik2.jpg', caption: 'Proses Pewarnaan Alami' },
    { src: 'img/membatik.jpg', caption: 'Proses Lorod (Pelepasan Lilin)' },
    { src: 'img/membatik 4.jpg', caption: 'Kain Batik Siap Digunakan' }
];

export const STEPS_DATA = [
    { number: '01', icon: 'fas fa-scroll', title: 'Persiapan Kain (Mordanting)', description: 'Kain mori (katun atau sutra) dicuci dan direndam dalam larutan minyak nabati untuk menyiapkan serat kain agar dapat menyerap warna dengan sempurna.' },
    { number: '02', icon: 'fas fa-pencil-ruler', title: 'Membuat Pola (Nyungging)', description: 'Pengrajin menggambar sketsa motif batik di atas kain menggunakan pensil. Pola ini menjadi panduan untuk proses selanjutnya.' },
    { number: '03', icon: 'fas fa-fire', title: 'Mencanting (Melekatkan Lilin)', description: 'Menggunakan canting, pengrajin melukis di atas pola dengan lilin panas (malam). Area yang tertutup lilin akan menolak pewarna.' },
    { number: '04', icon: 'fas fa-palette', title: 'Pewarnaan (Nyolet/Nembok)', description: 'Kain dicelup ke dalam larutan pewarna alami. Proses ini bisa diulang berkali-kali untuk mencapai kedalaman warna yang diinginkan.' },
    { number: '05', icon: 'fas fa-water', title: 'Pelepasan Lilin (Nglorod)', description: 'Kain direbus dalam air panas untuk meluruhkan dan menghilangkan lapisan lilin, sehingga menampakkan motif asli yang berwarna putih.' },
    { number: '06', icon: 'fas fa-check-double', title: 'Finishing & Pengeringan', description: 'Setelah lilin bersih, kain dicuci sekali lagi lalu diangin-anginkan di tempat teduh hingga kering. Kini, mahakarya batik siap digunakan.' }
];

export const GUIDE_DATA = [
    {
        icon: 'fas fa-tint', title: 'Pilar 1: Cara Mencuci',
        description: 'Kesalahan dalam mencuci dapat merusak serat dan warna kain. Lakukan dengan lembut dan bahan yang tepat.',
        points: [
            { icon: 'fas fa-check-circle', title: 'Gunakan Lerak / Sampo', description: 'Hindari deterjen. Gunakan sari lerak atau sampo bayi yang lembut untuk menjaga warna.' },
            { icon: 'fas fa-check-circle', title: 'Cuci dengan Tangan', description: 'Jangan gunakan mesin cuci. Cukup kucek perlahan dengan tangan di bagian yang kotor.' },
            { icon: 'fas fa-check-circle', title: 'Jangan Diperas', description: 'Setelah dibilas, jangan memeras kain terlalu kencang agar serat kain tidak rusak.' }
        ]
    },
    {
        icon: 'fas fa-sun', title: 'Pilar 2: Penjemuran & Penyetrikaan',
        description: 'Panas berlebih adalah musuh utama batik. Proses pengeringan dan setrika perlu perhatian khusus.',
        points: [
            { icon: 'fas fa-check-circle', title: 'Jemur di Tempat Teduh', description: 'Hindari sinar matahari langsung. Angin-anginkan di tempat yang teduh hingga kering.' },
            { icon: 'fas fa-check-circle', title: 'Jangan Semprot Pewangi', description: 'Cairan pewangi atau pelembut bisa meninggalkan noda pada warna alami batik.' },
            { icon: 'fas fa-check-circle', title: 'Lapisi Saat Menyetrika', description: 'Setrika dalam keadaan kain sedikit lembab, dan selalu lapisi dengan kain lain di atasnya.' }
        ]
    },
    {
        icon: 'fas fa-box-open', title: 'Pilar 3: Penyimpanan Terbaik',
        description: 'Cara Anda menyimpan akan menentukan apakah batik akan awet atau justru rusak oleh jamur dan serangga.',
        points: [
            { icon: 'fas fa-check-circle', title: 'Gulung, Jangan Dilipat', description: 'Melipat kain akan meninggalkan bekas patahan. Sebaiknya gulung kain dengan rapi.' },
            { icon: 'fas fa-check-circle', title: 'Gunakan Lada atau Cengkeh', description: 'Hindari kapur barus. Gunakan merica atau cengkeh dalam buntalan kain untuk mencegah serangga.' },
            { icon: 'fas fa-check-circle', title: 'Anginkan Secara Berkala', description: 'Keluarkan batik dari lemari setiap beberapa bulan sekali untuk diangin-anginkan agar tidak lembab.' }
        ]
    }
];  