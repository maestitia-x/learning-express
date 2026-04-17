// Hata yönetimi için kullanılacak özel hata sınıfını projeye dahil et.
// CRUD operasyonlarını yönetecek tüm servis fonksiyonlarını ilgili dosyadan içe aktar.
import {AppError} from "../utils/AppError.js";
import {deleteTodo,getAllTodos,updateTodo,createTodo,getTodoById} from "../services/todoService.js";

// Tüm verileri listeleyecek olan controller fonksiyonunu dışa aktarılacak şekilde tanımla.
// Servis katmanı üzerinden mevcut tüm verileri getir ve bir değişkene ata.
// İstemciye 200 başarılı durum koduyla birlikte işlemin başarı durumunu ve verilerin kendisini dön.
export function getTodos(req,res) {
    const todos = getAllTodos()
    return res.status(200).json({
        success:true,
        message:"We get the all todos",
        data:todos
    })
}


// Tek bir verinin detayını getirecek controller fonksiyonunu dışa aktarılacak şekilde tanımla.
// İstek parametrelerinden (URL üzerinden) kimlik bilgisini al ve matematiksel sayı tipine dönüştür.
// Elde ettiğin bu kimlik bilgisini kullanarak servis katmanından o veriyi çağır.
// Burada bir kontrol düşün: Eğer servis böyle bir veri bulamazsa ne yapmalısın? 404 durum kodu ile özel hata fırlat.
// Eğer veri başarıyla bulunduysa, 200 durum kodu, işlem başarı durumu ve bulunan veriyi JSON olarak dön.
export function getTodo(req,res) {
    const id = Number(req.params.id)
    const todo = getTodoById(id)

    if (!todo) {
        throw new AppError("Todo hasn't been found.", 404)
    }

    return res.status(200).json({
        success:true,
        message:"Todo is found!",
        data:todo
    })

}



// Sisteme yeni bir veri ekleyecek controller fonksiyonunu dışa aktarılacak şekilde tanımla.
// İstemciden gelen istek gövdesindeki (body) eklenecek veriyi (başlık) al.
// Burada bir doğrulama kurgula: Gelen veri tanımsızsa veya beklenen metin (string) veri tipinde değilse işlemi durdur ve özel hata fırlat.
// Doğrulamadan başarıyla geçilirse, servis katmanını kullanarak bu yeni veriyi oluştur.
// İşlemin sonunda istemciye 200 durum kodu, işlemin başarı durumu, bilgilendirici bir mesaj ve oluşturulan yeni veriyi dön.
export function addTodo(req,res) {
    const title = req.body
    if (title === undefined || typeof title !== 'string') {
        throw new AppError("Todo is required and must be a string")
    }
    const createdTodo = createTodo(title)

    return res.status(200).json({
        success:true,
        message:"Todo created successfully.",
        data:createdTodo
    })
}


// Mevcut bir veriyi güncelleyecek controller fonksiyonunu dışa aktarılacak şekilde tanımla.
// İstek parametrelerinden güncellenecek verinin kimlik bilgisini al ve sayı tipine çevir.
// İstek gövdesinden güncellenmesi istenen alanları (örneğin başlık ve tamamlanma durumu) ayrıştırarak çıkar.
// Birinci doğrulama: İstemci güncellenecek hiçbir alan göndermemiş mi? Eğer öyleyse 400 durum koduyla hata fırlat.
// İkinci doğrulama: Eğer bir başlık gönderilmişse, bunun metin tipinde olup olmadığını kontrol et. Değilse 400 hatası fırlat.
// Üçüncü doğrulama: Eğer tamamlanma durumu gönderilmişse, bunun mantıksal (boolean) tipte olup olmadığını kontrol et. Değilse 400 hatası fırlat.
// Tüm doğrulamalar geçildikten sonra kimlik bilgisi ve yeni veri değerleriyle servis katmanındaki güncelleme işlemini tetikle.
// Dördüncü doğrulama: Servis güncellenecek böyle bir kayıt bulamadığı için boş bir sonuç mu döndürdü? O halde 404 hatası fırlat.
// Güncelleme tamamsa; 200 durum kodu, başarı durumu, başarılı mesajı ve verinin en güncel halini istemciye dön.
export function editTodo(req,res) {
    const id = Number(req.params.id)
    const {title, completed} = req.body

    if (title === undefined && completed === undefined) {
        throw new AppError("Title and completed is not given!", 400)
    }
    if (title !== undefined && typeof title !== 'string') {
        throw new AppError("Title is given but its not string!")
    }
    if (completed !== undefined && typeof completed !=='boolean'){
        throw new AppError("Completed section must be boolean")
    }
    const updatedTodo = updateTodo(id, {title, completed})

    if (!updatedTodo) {
        throw new AppError("There is not a todo with this ID")
    }

    return res.status(200).json({
        success:true,
        message:"Todo updated successfully.",
        data:updatedTodo
    })

}




// Sistemden veri silecek controller fonksiyonunu dışa aktarılacak şekilde tanımla.
// URL üzerinden gelen kimlik bilgisini al ve sayı formatına dönüştür.
// Servis katmanındaki silme fonksiyonuna bu kimliği gönder ve dönen sonucu bir değişkende tut.
// Burada bir kontrol yap: Eğer silinmeye çalışılan veri zaten sistemde yoksa (servis başarısız dönerse) 404 hatası fırlat.
// Silme işlemi başarıyla gerçekleştiyse, 200 durum kodu, başarı durumu, işlemin mesajı ve silinen verinin bilgilerini geri dön.
export function deleteTodo(req,res) {
    const id = Number(req.params.id)
    const deletedTodo = deleteTodo(id)
    if (!deletedTodo) {
        throw new AppError("There is not a todo found to be deleted!")
    }
    return res.status(200).json({
        success:true,
        message:"Todo deleted!",
        data:deletedTodo
    })
}


// ---------------------------------------------------------
// Kullanılacak Fonksiyon İsimleri:
// - Controller Fonksiyonları: getTodos, getTodo, addTodo, editTodo, deleteTodo
// - Servis Fonksiyonları: getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo