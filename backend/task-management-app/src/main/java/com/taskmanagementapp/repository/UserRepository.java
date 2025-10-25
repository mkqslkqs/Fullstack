package com.taskmanagementapp.repository;

import com.taskmanagementapp.model.User;
import com.taskmanagementapp.enums.AvailabilityStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByAvailabilityStatus(AvailabilityStatus status);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
}
