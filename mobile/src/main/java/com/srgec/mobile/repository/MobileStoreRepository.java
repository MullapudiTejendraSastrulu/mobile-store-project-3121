package com.srgec.mobile.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.srgec.mobile.model.MobileStore;
@Repository
public interface MobileStoreRepository extends JpaRepository<MobileStore , Integer>{
    Optional<MobileStore> findBymobileId(String mobileId);
}
