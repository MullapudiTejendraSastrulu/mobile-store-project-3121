package com.srgec.mobile.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.srgec.mobile.model.MobileStore;
import com.srgec.mobile.service.MobileStoreService;

@RestController
@CrossOrigin(origins = "https://mobile-store-app-23f9.vercel.app")
public class MobileStoreController {
    private final MobileStoreService mService;

    public MobileStoreController(MobileStoreService mService) {
        this.mService = mService;
    }

    @GetMapping("/mobiles")
    public List<MobileStore> getMobiles() {
        return mService.getMobile();
    }

    @PostMapping("/addmobile")
    public MobileStore addMobile(@RequestBody MobileStore mobile) {
        return mService.addMobile(mobile);
    }
    @PutMapping("/updatemobile/{mobileId}")
    public MobileStore updateMobile(@RequestBody MobileStore mobile, @PathVariable String mobileId) {
        return mService.updateMobile(mobile, mobileId);
    }
    @DeleteMapping("/deletemobile/{mobileId}")
    public String deleteMobile(@PathVariable String mobileId) {
        return mService.deleteMobile(mobileId);
    }
}
