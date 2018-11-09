package Optimization;

public class LoopInvariantCodeMotion {

	public int Method()
	{
		int result = 0;
		int x = 0;
		
		int y = 1;
		int z = 2;
		
		for (int i = 0; i < 10; i++)
		{
			x = y + z;
			result += x;
		}
		
		return result;
	}
	
}
