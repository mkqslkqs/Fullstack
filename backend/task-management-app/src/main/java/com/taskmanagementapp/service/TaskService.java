package com.taskmanagementapp.service;

import com.taskmanagementapp.dto.TaskDto;
import com.taskmanagementapp.enums.AvailabilityStatus;
import com.taskmanagementapp.enums.PriorityLevel;
import com.taskmanagementapp.model.Task;
import com.taskmanagementapp.enums.TaskStatus;
import com.taskmanagementapp.model.User;
import com.taskmanagementapp.repository.TaskRepository;
import com.taskmanagementapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }


    public TaskDto getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        return convertToDto(task);
    }

    @Transactional
    public TaskDto createTask(TaskDto taskDto) {
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setPriorityLevel(PriorityLevel.valueOf(taskDto.getPriorityLevel()));
        task.setStatus(TaskStatus.TO_DO);


        if (taskDto.getAssignedUserId() != null) {
            User assignedUser = userRepository.findById(taskDto.getAssignedUserId())
                    .orElseThrow(() -> new RuntimeException("Assigned user not found"));
            task.setAssignedUser(assignedUser);
        }

        Task savedTask = taskRepository.save(task);
        return convertToDto(savedTask);
    }

    @Transactional
    public TaskDto updateTask(Long taskId, TaskDto taskDto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setPriorityLevel(PriorityLevel.valueOf(taskDto.getPriorityLevel()));
        task.setStatus(TaskStatus.valueOf(taskDto.getStatus()));


        if (taskDto.getAssignedUserId() != null) {
            User assignedUser = userRepository.findById(taskDto.getAssignedUserId())
                    .orElseThrow(() -> new RuntimeException("Assigned user not found"));
            task.setAssignedUser(assignedUser);
        } else {
            task.setAssignedUser(null);
        }

        Task updatedTask = taskRepository.save(task);
        return convertToDto(updatedTask);
    }

    public void deleteTask(Long taskId) {
        if (!taskRepository.existsById(taskId)) {
            throw new RuntimeException("Task not found with id: " + taskId);
        }
        taskRepository.deleteById(taskId);
    }

    @Transactional
    public TaskDto assignTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));

        List<User> availableUsers = userRepository.findByAvailabilityStatus(AvailabilityStatus.AVAILABLE);
        if (availableUsers.isEmpty()) {
            throw new RuntimeException("No available users to assign the task.");
        }

        User userToAssign = availableUsers.get(0);
        task.setAssignedUser(userToAssign);
        Task updatedTask = taskRepository.save(task);

        return convertToDto(updatedTask);
    }

    private TaskDto convertToDto(Task task) {
        TaskDto taskDto = new TaskDto();
        taskDto.setId(task.getId());
        taskDto.setTitle(task.getTitle());
        taskDto.setDescription(task.getDescription());
        taskDto.setPriorityLevel(task.getPriorityLevel().toString());
        taskDto.setStatus(task.getStatus().toString()); // Add status
        taskDto.setCreationTimestamp(task.getCreationTimestamp());
        if (task.getAssignedUser() != null) {
            taskDto.setAssignedUserId(task.getAssignedUser().getId());
            taskDto.setAssignedUsername(task.getAssignedUser().getUsername());
        }
        return taskDto;
    }
}

