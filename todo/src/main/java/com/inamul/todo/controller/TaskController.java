package com.inamul.todo.controller;

import com.inamul.todo.model.Task;
import com.inamul.todo.model.User;
import com.inamul.todo.service.TaskService;
import com.inamul.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:3000/")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @GetMapping("/get-all-tasks")
    public List<Task> getAllTAsks() {
        return taskService.getAll();
    }

    @GetMapping("/get-tasks-with-user-id/{userId}")
    public List<Task> getTasksWithUserId(@PathVariable int userId) {
        return taskService.getTasksWithUserId(userId);
    }

    @GetMapping("/get-task/{taskId}")
    public ResponseEntity<Task> getTask(@PathVariable int taskId) {
        Task task = taskService.getTask(taskId);
        if(task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PostMapping("/insert-task")
    public ResponseEntity<String> insertTask(@RequestBody Task task, @RequestParam int userId) {
        User user = userService.getUser(userId);
        if (user == null) {
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }
        if(task.getTitle().isEmpty() || task.getDescription().isEmpty() || task.getDueDate().isEmpty()) {
            return new ResponseEntity<>("Undefined Input Values", HttpStatus.BAD_REQUEST);
        }
        task.setUser(user);
        taskService.saveTask(task);
        return new ResponseEntity<>("Insertion Successful", HttpStatus.OK);
    }

    @PutMapping("/update-task/{taskId}")
    public ResponseEntity<String> updateTask(@PathVariable int taskId, @RequestBody Task task) {
        Task existingTask = taskService.getTask(taskId);
        if(existingTask == null) {
            return new ResponseEntity<>("Task Not Found", HttpStatus.NOT_FOUND);
        }
        try {
            taskService.saveTask(task);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Update Successful", HttpStatus.OK);
    }

    @DeleteMapping("/delete-task/{taskId}")
    public String deleteTask(@PathVariable int taskId) {
        taskService.deleteTask(taskId);
        return "Deletion Successful";
    }
}
