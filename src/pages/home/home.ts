import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;
  textHtml: string;

  constructor( public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider,) {
      this.dataService.getProducts()
        .subscribe((response)=> {
            this.products = response
            console.log(this.products);
        });
  }

  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
        this.toast.show('Product not found', '1000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
      let url = barcodeData.text
      this.textHtml = url
      

      if(url.split('')[0] == 'h' && url.split('')[1] == 't' && url.split('')[2] == 't' ){
        window.open(url, '_blank','location=yes')
      }
      
      
      
    }, (err) => {
      this.toast.show(err, '1000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    })
    var promise = Promise.resolve().then(function(){
      console.log('rejection');
      throw new Error('Failed');
    });
    promise['catch'](function(){console.log('caught')});

    
    

  }

  
    
  

}
