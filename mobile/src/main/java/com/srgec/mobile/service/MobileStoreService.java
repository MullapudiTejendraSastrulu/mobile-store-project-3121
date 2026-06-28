package com.srgec.mobile.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.srgec.mobile.model.MobileStore;
import com.srgec.mobile.repository.MobileStoreRepository;

@Service
public class MobileStoreService {
    private final MobileStoreRepository msRepo;

    public MobileStoreService(MobileStoreRepository msRepo) {
        this.msRepo = msRepo;
    }

    public MobileStore addMobile(MobileStore mob) {
        return msRepo.save(mob);
    }

    public List<MobileStore> getMobile() {
        return msRepo.findAll();
    }

    public MobileStore updateMobile(MobileStore mob, String mobileId) {
        MobileStore m = msRepo.findBymobileId(mobileId).orElse(null);
        if (m != null) {
            
            m.setBrand(mob.getBrand());
            m.setModel(mob.getModel());
            m.setPrice(mob.getPrice());
            msRepo.save(m);
        }
        return m;
    }

    public String deleteMobile(String mobileId) {
        MobileStore m = msRepo.findBymobileId(mobileId).orElse(null);
        if (m != null) {
            msRepo.delete(m);
            return "Deleted Successfully";
        }
        return null;
    }
}
