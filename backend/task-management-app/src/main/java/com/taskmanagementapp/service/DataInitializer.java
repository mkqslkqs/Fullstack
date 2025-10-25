//package com.taskmanagementapp.config;
//
//import com.taskmanagementapp.model.*;
//import com.taskmanagementapp.repository.TaskRepository;
//import com.taskmanagementapp.repository.UserRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//import org.springframework.beans.factory.annotation.Autowired;
//
//
//import java.util.List;
//
//@Component
//public class DataInitializer implements CommandLineRunner {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private TaskRepository taskRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Override
//    public void run(String... args) throws Exception {
//        if (userRepository.count() == 0) {
//
//            User user1 = new User("alice", "alice@example.com", passwordEncoder.encode("password123"), AvailabilityStatus.AVAILABLE);
//            User user2 = new User("bob", "bob@example.com", passwordEncoder.encode("password123"), AvailabilityStatus.BUSY);
//            User user3 = new User("charlie", "charlie@example.com", passwordEncoder.encode("password123"), AvailabilityStatus.AVAILABLE);
//            List<User> savedUsers = userRepository.saveAll(List.of(user1, user2, user3));
//
//
//            User savedUser1 = savedUsers.get(0);
//            User savedUser2 = savedUsers.get(1);
//            User savedUser3 = savedUsers.get(2);
//
//
//            Task task1 = new Task();
//            task1.setTitle("Setup project repository");
//            task1.setDescription("Initialize Git repo and push initial commit.");
//            task1.setPriorityLevel(PriorityLevel.HIGH);
//            task1.setStatus(TaskStatus.DONE);
//            task1.setAssignedUser(savedUser1);
//
//            Task task2 = new Task();
//            task2.setTitle("Design database schema");
//            task2.setDescription("Create ER diagram and define all tables.");
//            task2.setPriorityLevel(PriorityLevel.CRITICAL);
//            task2.setStatus(TaskStatus.IN_PROGRESS);
//            task2.setAssignedUser(savedUser1);
//
//            Task task3 = new Task();
//            task3.setTitle("Develop user authentication");
//            task3.setDescription("Implement login and registration endpoints.");
//            task3.setPriorityLevel(PriorityLevel.HIGH);
//            task3.setStatus(TaskStatus.IN_PROGRESS);
//            task3.setAssignedUser(savedUser2);
//
//            Task task4 = new Task();
//            task4.setTitle("Create Task CRUD endpoints");
//            task4.setDescription("Implement API for creating, reading, updating, and deleting tasks.");
//            task4.setPriorityLevel(PriorityLevel.MEDIUM);
//            task4.setStatus(TaskStatus.TO_DO);
//            task4.setAssignedUser(savedUser3);
//
//            Task task5 = new Task();
//            task5.setTitle("Write unit tests for controllers");
//            task5.setDescription("Achieve 80% code coverage for all controllers.");
//            task5.setPriorityLevel(PriorityLevel.LOW);
//            task5.setStatus(TaskStatus.TO_DO);
//
//            taskRepository.saveAll(List.of(task1, task2, task3, task4, task5));
//        }
//    }
//}
