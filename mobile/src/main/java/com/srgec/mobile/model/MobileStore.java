package com.srgec.mobile.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="mobilestore")
@Data
@NoArgsConstructor
public class MobileStore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String mobileId;
    @Column
    private String brand;
    @Column
    private String model;
    @Column
    private String price;
  
    public MobileStore(String mobileId, String brand, String model, String price) {
        this.mobileId = mobileId;
        this.brand = brand;
        this.model = model;
        this.price = price;
    }

    
}
