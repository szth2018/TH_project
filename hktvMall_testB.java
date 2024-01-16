// Q1
public class hktvMall_testB {
    public static void main(String[] args) {
        String input = "retlaohS";
        String output = "";
        for (int i = input.length() - 1; i >= 0; i--) {
            output += input.charAt(i);
        }
        System.out.println(output);
    }
}

//Q2
/* SELECT user_code, COUNT(*) as total_packed
FROM order_tote_process_log
WHERE action_code = 'PACKED' AND 
      process_date BETWEEN '2023-11-01 10:00:00' AND '2023-11-01 10:59:59'
GROUP BY user_code;
 */
